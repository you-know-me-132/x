function getDeviceIPs() {
    return new Promise((resolve, reject) => {  
      const xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://api.ipify.org?format=json', true);  
      xhr.onload = function() {
          if (xhr.status === 200) {
            const ipAddress = JSON.parse(xhr.responseText).ip;
            resolve(scan(ipAddress));
          } else {
            reject('Error getting IP address');
          }
        };
        xhr.onerror = function() {
          reject('Error getting IP address');
        };
        xhr.send();
      });
    }
    function scan(ipAddress) {
      const ipParts = ipAddress.split('.');
      const ipBase = ipParts.slice(0, 3).join('.') + '.';
      const devices = [];
      for (let i = 1; i <= 2000; i++) {
        const devIp = ipBase + i;
        devices.push({
          ip: devIp,
          mac: ''
        });
      }
      return devices;
    }
    document.getElementById('scan-button').addEventListener('click', () => {
      getDeviceIPs().then((devices) => {
        const deviceList = document.getElementById('device-ul');
        deviceList.innerHTML = '';
        devices.forEach((device) => {
          const listItem = document.createElement('li');
          listItem.textContent = `${device.ip} - ${device.mac}`;
          deviceList.appendChild(listItem);
        });
      });
    });