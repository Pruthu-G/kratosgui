import cv2
from flask import Flask, render_template, Response
import gi
gi.require_version('Gst', '1.0')
from gi.repository import Gst, GLib
import threading
import numpy as np

Gst.init(None)

class GStreamerVideo:
    def __init__(self, pipeline_str):
        self.pipeline_str = pipeline_str
        self.pipeline = None
        self.video_sink = None
        self.running = False
        self.latest_frame = None
        self.frame_condition = threading.Condition()

    def start(self):
        self.pipeline = Gst.parse_launch(self.pipeline_str)
        self.video_sink = self.pipeline.get_by_name('appsink0')
        
        self.video_sink.set_property('emit-signals', True)
        self.video_sink.connect('new-sample', self.on_new_sample)
        
        self.pipeline.set_state(Gst.State.PLAYING)
        self.running = True
        
        self.loop = GLib.MainLoop()
        self.thread = threading.Thread(target=self.loop.run)
        self.thread.daemon = True
        self.thread.start()

    def on_new_sample(self, sink):
        sample = sink.emit('pull-sample')
        if sample:
            buf = sample.get_buffer()
            caps = sample.get_caps()
            
            caps_struct = caps.get_structure(0)
            width = caps_struct.get_value('width')
            height = caps_struct.get_value('height')
            
            success, map_info = buf.map(Gst.MapFlags.READ)
            if success:
                frame = np.ndarray(
                    shape=(height, width, 3),
                    dtype=np.uint8,
                    buffer=map_info.data
                )
                
                with self.frame_condition:
                    self.latest_frame = frame.copy()
                    self.frame_condition.notify_all()
                
                buf.unmap(map_info)
        
        return Gst.FlowReturn.OK

    def get_frame(self):
        with self.frame_condition:
            if self.latest_frame is not None:
                return self.latest_frame.copy()
            return None

    def stop(self):
        self.running = False
        if self.pipeline:
            self.pipeline.set_state(Gst.State.NULL)
        if self.loop:
            self.loop.quit()
        if self.thread:
            self.thread.join()


camera_ports = {
    'Camera 1': 'udpsrc port=9000 ! application/x-rtp,payload=96 ! rtph264depay ! h264parse ! avdec_h264 ! videoconvert ! video/x-raw,format=BGR ! appsink name=appsink0',
    'Camera 2': 'udpsrc port=9001 ! application/x-rtp,payload=96 ! rtph264depay ! h264parse ! avdec_h264 ! videoconvert ! video/x-raw,format=BGR ! appsink name=appsink0',
    'Camera 3': 'udpsrc port=9002 ! application/x-rtp,payload=96 ! rtph264depay ! h264parse ! avdec_h264 ! videoconvert ! video/x-raw,format=BGR ! appsink name=appsink0',
    'Camera 4': 'udpsrc port=9003 ! application/x-rtp,payload=96 ! rtph264depay ! h264parse ! avdec_h264 ! videoconvert ! video/x-raw,format=BGR ! appsink name=appsink0',
    'Camera 5': 'udpsrc port=9004 ! application/x-rtp,payload=96 ! rtph264depay ! h264parse ! avdec_h264 ! videoconvert ! video/x-raw,format=BGR ! appsink name=appsink0',
    'Camera 6': 'udpsrc port=9005 ! application/x-rtp,payload=96 ! rtph264depay ! h264parse ! avdec_h264 ! videoconvert ! video/x-raw,format=BGR ! appsink name=appsink0'
}

camera_instances = {}

def generate_frames(camera_instance):
    while camera_instance.running:
        frame = camera_instance.get_frame()
        if frame is not None:
            _, buffer = cv2.imencode('.jpg', frame)
            frame_bytes = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')
