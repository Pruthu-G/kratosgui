import subprocess
import functools
from os import walk
import json
import subprocess
import threading
from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for, Response
)
from werkzeug.security import check_password_hash, generate_password_hash
import os
from .db import get_db
from .video_feeds import GStreamerVideo, camera_ports, generate_frames
bp=Blueprint('kratos',__name__,'/')
camera_instances={}
class sockets:
    def __init__(self):
        self.web_socket_sp: subprocess.Popen
        self.web_socket_sp_8766: subprocess.Popen
        self.web_socket_sp_8767: subprocess.Popen

obj=sockets()
SITE_ROOT = os.path.realpath(os.path.dirname(__file__))

@bp.route('/')
def home():
    return render_template("base.html")

@bp.route('/ld')
def ld():
    obj.web_socket_sp_8766=subprocess.Popen(['python3','../websocket_module.py'],stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL,cwd=SITE_ROOT)
    return render_template('ld.html')

@bp.route('/arm')
def arm():
    obj.web_socket_sp=subprocess.Popen(['python3','../websocket_module.py'],stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL,cwd=SITE_ROOT)
    return render_template('arm.html')

@bp.route('/ldgas')
def ldgas():
    obj.web_socket_sp.terminate()
    return render_template('gas_sensor.html')
@bp.route('/npk')
def npk():
    obj.web_socket_sp_8767=subprocess.Popen(['python3','../websocket_8767_npk.py'],stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL,cwd=SITE_ROOT)
    return render_template('npk.html')

@bp.route('/video')
def video():
    return render_template('video.html',camera_ports=camera_ports)
@bp.route('/video_feed/<camera_name>')
def video_feed(camera_name):
    if camera_name not in camera_instances:
        pipeline_str = camera_ports.get(camera_name)
        if pipeline_str:
            camera_instances[camera_name] = GStreamerVideo(pipeline_str)
            camera_instances[camera_name].start()
        else:
            return "Camera not found", 404

    return Response(
        generate_frames(camera_instances[camera_name]),
        mimetype='multipart/x-mixed-replace; boundary=frame'
    )

@bp.route('/exit')
def exit():
    obj.web_socket_sp_8766.terminate()
    obj.web_socket_sp_8767.terminate()
    return render_template('base.html')
