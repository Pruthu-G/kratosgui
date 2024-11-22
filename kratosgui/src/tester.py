#!/usr/bin/env python3

import rospy
import random
from std_msgs.msg import Float32MultiArray

def publish_random_data():
    rospy.init_node('spectro_random_publisher', anonymous=True)
    pub = rospy.Publisher('/spectro', Float32MultiArray, queue_size=10)
    rate = rospy.Rate(1)  # 1 Hz

    while not rospy.is_shutdown():
        # Generate random values between 0 and 100 for each of the 18 fields
        msg = Float32MultiArray()
        msg.data = [random.uniform(0, 100) for _ in range(18)]  # 18 random values
        
        rospy.loginfo(f"Publishing random data: {msg.data}")
        pub.publish(msg)
        rate.sleep()

if __name__ == "__main__":
    try:
        publish_random_data()
    except rospy.ROSInterruptException:
        pass

"""#!/usr/bin/env python3

import rospy
from std_msgs.msg import Float32MultiArray

def publish_test_data():
    rospy.init_node('spectro_publisher', anonymous=True)
    pub = rospy.Publisher('/spectro', Float32MultiArray, queue_size=10)
    rate = rospy.Rate(1)  # 1 Hz

    while not rospy.is_shutdown():
        # Create a message with 18 float values
        msg = Float32MultiArray()
        msg.data = [
            1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 
            9.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 
            16.0, 17.0, 18.0
        ]
        
        rospy.loginfo(f"Publishing test data: {msg.data}")
        pub.publish(msg)
        rate.sleep()

if __name__ == "__main__":
    try:
        publish_test_data()
    except rospy.ROSInterruptException:
        pass
                          """


