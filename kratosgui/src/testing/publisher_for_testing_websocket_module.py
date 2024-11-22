#!/usr/bin/env python3

"""import rospy
from std_msgs.msg import String
import json

def publisher():
    rospy.init_node('example_publisher', anonymous=True)
    pub = rospy.Publisher('/example_topic', String, queue_size=10)
    rate = rospy.Rate(1)  # Publish at 1 Hz

    while not rospy.is_shutdown():
        message = {"data": "Hello from ROS!", "timestamp": rospy.get_time()}
        ros_message = String(data=json.dumps(message))
        pub.publish(ros_message)
        rospy.loginfo(f"Published: {ros_message.data}")
        rate.sleep()

if __name__ == '__main__':
    try:
        publisher()
    except rospy.ROSInterruptException:
        pass"""


import rospy
from geometry_msgs.msg import Twist
import random

def twist_publisher():
    rospy.init_node('twist_publisher', anonymous=True)
    pub = rospy.Publisher('/cmd_vel', Twist, queue_size=10)
    rate = rospy.Rate(2)  # Publish at 2 Hz

    while not rospy.is_shutdown():
        twist_msg = Twist()
        twist_msg.linear.x = random.uniform(-1.0, 1.0)
        twist_msg.linear.y = random.uniform(-1.0, 1.0)
        twist_msg.linear.z = random.uniform(-1.0, 1.0)
        twist_msg.angular.x = random.uniform(-1.0, 1.0)
        twist_msg.angular.y = random.uniform(-1.0, 1.0)
        twist_msg.angular.z = random.uniform(-1.0, 1.0)
        rospy.loginfo(f"Publishing: {twist_msg}")
        pub.publish(twist_msg)
        rate.sleep()

if __name__ == "__main__":
    try:
        twist_publisher()
    except rospy.ROSInterruptException:
        pass
                
