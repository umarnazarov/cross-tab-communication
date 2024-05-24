/* eslint-disable no-undef */
const connections = [];

onconnect = function (event) {
  const port = event.ports[0];
  connections.push(port);

  port.onmessage = function (event) {
    const { duration } = event.data;
    const endTime = Date.now() + duration;
    const interval = setInterval(() => {
      const currentTime = Date.now();
      const remainingTime = endTime - currentTime;

      if (remainingTime <= 0) {
        clearInterval(interval);
        close();
        connections.map((conn) => conn.postMessage(0));
      } else {
        connections.map((conn) => conn.postMessage(remainingTime));
      }
    }, 1000);
  };
};
