import { WEBSOCKET_MESSAGE } from "@/resources/constants";
import { RawData } from "@/resources/types";
import { useEffect, useState } from "react";

const useWebsocket = (url: string): RawData => {
  const [data, setData] = useState<RawData>([]);

  useEffect(() => {
    const websocket = new WebSocket(url);

    websocket.onopen = (): void => {
      if (websocket.readyState === WebSocket.OPEN) {
        websocket.send(JSON.stringify(WEBSOCKET_MESSAGE));
      }
    };

    websocket.onmessage = (event: MessageEvent<string>): void => {
      const response = JSON.parse(event.data);
      if (response && Array.isArray(response) && response.length !== 0) {
        setData(response[1]);
      }
    };
  }, []);

  return data;
};

export default useWebsocket;
