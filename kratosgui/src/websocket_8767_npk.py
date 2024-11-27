#!/usr/bin/env python3
import rospy
from std_msgs.msg import Float64MultiArray
from .websocket_module import websocket_module

if __name__=="__main__":
    obj=websocket_module("/npk_sensor_data",Float64MultiArray,8767)
    obj.loop_thread.start()
