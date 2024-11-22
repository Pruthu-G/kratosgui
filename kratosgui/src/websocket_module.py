"""!/usr/bin/env python3

import rospy
import json 
from std_msgs.msg import Float32MultiArray
import os
SITE_ROOT = os.path.realpath(os.path.dirname(__file__))
json_url = os.path.join(SITE_ROOT, 'app/static', 'json/spectro_data.json')

rospy.init_node('kratosgui',anonymous=True)


def spectro_callback(msg: Float32MultiArray):
   dict={
        "A": msg.data[0],
        "B": msg.data[1],
        "c": msg.data[2],
        "D": msg.data[3],
        "E": msg.data[4],
        "F": msg.data[5],
        "G": msg.data[6],
        "H": msg.data[7],
        "R": msg.data[8],
        "I": msg.data[9],
        "S": msg.data[10],
"J": msg.data[11],
        "T": msg.data[12],
        "U": msg.data[13],
        "V": msg.data[14],
        "W": msg.data[15],
        "K": msg.data[16],
        "L": msg.data[17]
    }
   with open(json_url,"w") as f:
        json.dump(dict,f)

spectro_sub=rospy.Subscriber('/spectro',Float32MultiArray,spectro_callback)

if __name__=="__main__":
    rospy.spin()


#yippieeee the receiving works !!!!!!!!!!!
"""
#!/usr/bin/env python3

import rospy
import threading
import asyncio
from std_msgs.msg import String, Int32MultiArray
from websockets.asyncio.server import serve
from geometry_msgs.msg import Twist
import json
#import yaml
from rospy_message_converter import json_message_converter
rospy.init_node('kratosgui',anonymous=True)
class websocket_module:
    async def async_send(self,websocket):
        while True:
            if self.latest_message:
                data=json_message_converter.convert_ros_message_to_json(self.latest_message)
                await websocket.send(json.dumps(data,indent=2))
                print(data)
                self.latest_message=None
            await asyncio.sleep(0.1)
    async def async_main(self):
        async with serve(self.async_send,"localhost",port=self.port):
            await asyncio.get_running_loop().create_future()
    def callback(self,msg):
        self.latest_message=msg
    #def on_shutdown(self):
    #    self.async_loop.call_soon_threadsafe(self.async_loop.stop)
    #    self.loop_thread.join() 
    def on_shutdown(self):
        print("Shutting down gracefully...")
        self.async_loop.call_soon_threadsafe(self.async_loop.stop)
        if self.loop_thread.is_alive():
            self.loop_thread.join()
    def __init__(self,topic_name: str, message_type, port: int):
        self.port=port
        self.latest_message=None
        self.async_loop=asyncio.new_event_loop()
        self.loop_thread=threading.Thread(target=self.async_loop.run_forever,daemon=True)
        #self.loop_thread.start()
        self.rossub=rospy.Subscriber(topic_name,message_type,self.callback)
        self.async_loop.create_task(self.async_main())
        rospy.on_shutdown(self.on_shutdown)

if __name__=="__main__":
    obj=websocket_module('/cmd_vel',Twist,8765)
    obj.loop_thread.start()
    rospy.spin()
    #obj=websocket_module('random',Int32MultiArray)
    #obj.loop_thread.start()
    #rospy.spin()





