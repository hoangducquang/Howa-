const videoContainer = document.querySelector("#videos");
let userToken = "";
let roomId = "";
let roomToken = "";
let room;
let callClient;

async function mounted() {
  api.setRestToken();

  const urlParams = new URLSearchParams(location.search);
  const roomId = urlParams.get("room");
  if (roomId) {
    this.roomId = roomId;
    await this.join();
  }
}

async function authen() {
  return new Promise(async (resolve) => {
    const userId = `${(Math.random() * 100000).toFixed(6)}`;
    const userToken = await api.getUserToken(userId);
    this.userToken = userToken;

    if (!this.callClient) {
      const client = new StringeeClient();

      client.on("authen", function (res) {
        console.log("on authen: ", res);
        resolve(res);
      });
      this.callClient = client;
    }
    this.callClient.connect(userToken);
  });
}

async function publish(screenSharing = false) {
  const localTrack = await StringeeVideo.createLocalVideoTrack(this.callClient, {
    audio: true,
    video: true,
    screen: screenSharing,
    videoDimensions: { width: 640, height: 360 },
  });

  const videoElement = localTrack.attach();
  this.addVideo(videoElement);

  const roomData = await StringeeVideo.joinRoom(this.callClient, this.roomToken);
  const room = roomData.room;
  console.log({ roomData, room });

  if (!this.room) {
    this.room = room;
    room.clearAllOnMethos();
    room.on("addtrack", (e) => {
      const track = e.info.track;

      console.log("addtrack", track);
      if (track.serverId === localTrack.serverId) {
        console.log("local");
        return;
      }
      this.subscribe(track);
    });
    room.on("removetrack", (e) => {
      const track = e.track;
      if (!track) {
        return;
      }

      const mediaElements = track.detach();
      mediaElements.forEach((element) => element.remove());
    });

    // Join existing tracks
    roomData.listTracksInfo.forEach((info) => this.subscribe(info));
  }

  await room.publish(localTrack);
  console.log("room publish successful");
}

async function createRoom() {
  const room = await api.createRoom();
  // const { roomId } = room;
  const roomToken = await api.getRoomToken(room.roomId);

  this.roomId = room.roomId;
  this.roomToken = roomToken;
  console.log({ roomId, roomToken });

  document.getElementById('roomID').innerHTML = this.roomId
  document.getElementById('roomTOKEN').innerHTML = roomToken
  

  await this.authen();
  await this.publish();
}

async function join() {
  const roomToken = await api.getRoomToken(this.roomId);
  this.roomToken = roomToken;

  await this.authen();
  await this.publish();
}

async function joinWithId() {
  const roomId = prompt("Dán Room ID vào đây nhé!");
  if (roomId) {
    this.roomId = roomId;
    await this.join();
  }
}

async function subscribe(trackInfo) {
  const track = await this.room.subscribe(trackInfo.serverId);
  track.on("ready", () => {
    const videoElement = track.attach();
    this.addVideo(videoElement);
  });
}

function addVideo(video) {
  video.setAttribute("controls", "true");
  video.setAttribute("playsinline", "true");
  videoContainer.appendChild(video);
}

// Call the necessary functions
mounted();
