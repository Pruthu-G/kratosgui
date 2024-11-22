#!/usr/bin/env python3
import rospy
from std_msgs.msg import Int32MultiArray
import websocket_module

if __name__=="__main__":
    obj=websocket_module.websocket_module('/random',Int32MultiArray,8766)
    obj.loop_thread.start()
    rospy.spin()

