#!/usr/bin/env python3
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

