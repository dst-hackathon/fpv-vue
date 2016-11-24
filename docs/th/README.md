## Useful Links
- [Project Repo](https://github.com/dst-hackathon/fpv-vue)
- [Trello](https://trello.com/b/B2jkUSrT/hackathon-2016-preparation)
- [Slack](https://dsthackathon.slack.com)

## Project Setup
- Install [Node.js](https://nodejs.org) - สามารถลงเวอร์ชันล่าสุดได้เลย
- Clone project repository

  ``` bash
  # สำหรับคนที่ setup ssh กับ git ไว้
  git clone git@github.com:dst-hackathon/fpv-vue.git

  # หรือถ้าไม่ได้ setup ssh ไว้
  git clone https://github.com/dst-hackathon/fpv-vue.git
  ```
- Install Yarn - เราจะลองใช้ yarn เป็น package manager แทน npm กัน, จากที่ได้ลองเล่นดู (มาประมาณ 2 วัน) การ install dependency ด้วย yarn จะเร็วกว่า npm อยู่พอสมควร

  ``` bash
  npm install -g yarn
  ```
- Install project dependencies

  ``` bash
  cd fpv-vue
  yarn
  ```

- Install [Vue Devtools](https://github.com/vuejs/vue-devtools) เพื่อใช้ debug Vue.js app
- Install Java ถ้ายังไม่มีในเครื่อง แนะนำให้ลง Java 8 เพื่อใช้รันโปรเจค API
