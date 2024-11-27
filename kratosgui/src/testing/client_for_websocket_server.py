"""#!/usr/bin/env python3
import asyncio
import websockets

async def websocket_client():
    uri = "ws://localhost:8765"
    async with websockets.connect(uri) as websocket:
        print("Connected to WebSocket server.")
        try:
            while True:
                message = await websocket.recv()
                print(message)
        except websockets.ConnectionClosed:
            print("Connection closed.")

if __name__ == "__main__":
    try:
        asyncio.run(websocket_client())
    except KeyboardInterrupt:
        print("Client terminated.")
"""
#!/usr/bin/env python

import rospy
from std_msgs.msg import Float64MultiArray
import random

def generate_random_data():
    """Generate a list of 18 random float values."""
    return [random.uniform(-10, 10) for _ in range(18)]

def random_publisher():
    rospy.init_node('random_publisher', anonymous=True)
    pub = rospy.Publisher('/random', Float64MultiArray, queue_size=10)
    rate = rospy.Rate(10)  # Publish at 10 Hz

    while not rospy.is_shutdown():
        msg = Float64MultiArray()
        
        # Set layout (optional, you can add meaningful dimension labels if desired)
        msg.layout.data_offset = 0
        msg.layout.dim = [
            {
                'label': 'random_data',
                'size': 18,
                'stride': 18
            }
        ]

        # Assign random data
        msg.data = generate_random_data()
        
        # Publish message
        rospy.loginfo(f"Publishing: {msg.data}")
        pub.publish(msg)
        
        rate.sleep()

if __name__ == '__main__':
    try:
        random_publisher()
    except rospy.ROSInterruptException:
        pass
