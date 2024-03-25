import React from 'react';
import {uniqueId} from 'lodash';
import AnaReactChat, {ChatController} from '@hsoub/ana-react-chat';

import defaultMessages from './Data/messages.json';
import m4aVoice from './Data/voice.m4a';
import mp3Voice from './Data/voice.mp3';
import mp4Screen from './Data/screen.mp4';
import webmScreen from './Data/screen.webm';
import videoPoster from './Data/poster.jpg';
import '@hsoub/ana-react-chat/style.css';
import './App.scss';

const user = {
  id: 3,
  first_name: 'محمد العمار',
  last_name: '',
  avatar: 'https://avatars.hsoubcdn.com/51359d8d485bb3d0dcb52aa56013276c?s=128',
};

const responce = async (file, category) => {
  const fileResponce = {
    id: uniqueId(),
    name: file.name,
    extension: 'jpg',
    mime_type: file.type,
    size: file.size,
    url: 'https://ana.hsoubdev.com/files/af2f82af-3205-4dcb-8566-485037b4bc98/989581.jpg',
    category: 'file',
    encodings: [],
    thumbnail_url:
      'https://ana.hsoubdev.com/files/af2f82af-3205-4dcb-8566-485037b4bc98/989581.jpg?size=thumbnail',
    accessibility: 'any',
    created_at: '2023-08-08T17:59:13.384338Z',
    updated_at: '2023-08-08T17:59:13.384338Z',
  };

  const voiceResponce = {
    id: uniqueId(),
    name: file.name,
    extension: 'mp3',
    mime_type: 'audio/mp3',
    size: file.size,
    url: mp3Voice,
    category: 'voice',
    encodings: [
      {
        name: file.name,
        size: file.size,
        mime_type: 'audio/mp3',
        url: mp3Voice,
      },
      {
        name: file.name,
        size: file.size,
        mime_type: 'audio/m4a',
        url: m4aVoice,
      },
    ],
  };

  const screenResponce = {
    id: uniqueId(),
    name: file.name,
    extension: 'webm',
    mime_type: 'video/webm',
    size: file.size,
    url: webmScreen,
    category: 'screen',
    encodings: [],
    thumbnail_url: videoPoster,
    accessibility: 'any',
    created_at: '2023-08-08T17:59:13.384338Z',
    updated_at: '2023-08-08T17:59:13.384338Z',
  };

  const videoResponce = screenResponce; // the some screen video, only for preview :)

  const serverResponce = {
    file: fileResponce,
    voice: voiceResponce,
    screen: screenResponce,
    video: videoResponce,
  };

  return serverResponce[category];
};

const encodedResponce = async (file, category) => {
  const fileResponce = {
    id: uniqueId(),
    name: file.name,
    extension: 'jpg',
    mime_type: file.type,
    size: file.size,
    url: 'https://ana.hsoubdev.com/files/af2f82af-3205-4dcb-8566-485037b4bc98/989581.jpg',
    category: 'file',
    encodings: [],
    thumbnail_url:
      'https://ana.hsoubdev.com/files/af2f82af-3205-4dcb-8566-485037b4bc98/989581.jpg?size=thumbnail',
    accessibility: 'any',
    created_at: '2023-08-08T17:59:13.384338Z',
    updated_at: '2023-08-08T17:59:13.384338Z',
  };

  const voiceResponce = {
    id: uniqueId(),
    name: file.name,
    extension: 'mp3',
    mime_type: 'audio/mp3',
    size: file.size,
    url: mp3Voice,
    category: 'voice',
    encodings: [
      {
        name: file.name,
        size: file.size,
        mime_type: 'audio/mp3',
        url: mp3Voice,
      },
      {
        name: file.name,
        size: file.size,
        mime_type: 'audio/m4a',
        url: m4aVoice,
      },
    ],
  };

  const screenResponce = {
    id: uniqueId(),
    name: file.name,
    extension: 'webm',
    mime_type: 'video/webm',
    size: file.size,
    url: webmScreen,
    category: 'screen',
    encodings: [
      {
        name: file.name,
        size: file.size,
        mime_type: 'video/webm',
        url: webmScreen,
      },
      {
        name: file.name,
        size: file.size,
        mime_type: 'video/mp4',
        url: mp4Screen,
      },
    ],
    thumbnail_url: videoPoster,
    accessibility: 'any',
    created_at: '2023-08-08T17:59:13.384338Z',
    updated_at: '2023-08-08T17:59:13.384338Z',
  };

  const videoResponce = screenResponce; // the some screen video, only for preview :)

  const serverResponce = {
    file: fileResponce,
    voice: voiceResponce,
    screen: screenResponce,
    video: videoResponce,
  };

  return serverResponce[category];
};

function App() {
  const [language, setLanguage] = React.useState('ar');

  const [messages, setMessages] = React.useState(defaultMessages);
  function switchLang() {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  }

  async function createMessageHandler(message) {
    setMessages((messages) => {
      return ChatController.messages.addMessage(
        messages,
        ChatController.message.createMessage(message),
      );
    });

    setTimeout(() => {
      setMessages((messages) => {
        return ChatController.messages.addMessage(
          messages,
          ChatController.message.createMessageSuccess({
            ...message,
            created_at: new Date().toString(),
          }),
        );
      });
    }, 500);
  }

  console.log(messages);

  async function updateMessageHandler(message) {
    setMessages((messages) => {
      return ChatController.messages.updateMessage(
        messages,
        ChatController.message.updateMessage(message),
      );
    });

    setTimeout(() => {
      setMessages((messages) => {
        return ChatController.messages.updateMessage(
          messages,
          ChatController.message.updateMessageSuccess(message),
        );
      });
    }, 500);
  }

  function deleteMessageHandler(message) {
    setMessages((messages) => {
      return ChatController.messages.deleteMessage(messages, message.id);
    });
  }

  function changeHandler(messages) {
    setMessages(messages);
  }

  async function uploadHandler(file, message, category) {
    setMessages((messages) => {
      return ChatController.messages.addMessage(
        messages,
        ChatController.message.createMessage(message),
      );
    });

    // Upload file ...
    setTimeout(async () => {
      const data = await responce(file, category);

      const messageSuccess = ChatController.message.uploadSuccess(
        data, // upload response
        message,
      );

      setMessages((messages) => {
        return ChatController.messages.updateMessage(
          messages,
          ChatController.message.createMessageSuccess({
            ...messageSuccess,
            file_id: data.id,
          }),
        );
      });
    }, 1000);

    setTimeout(async () => {
      const data = await encodedResponce(file, category);

      const messageSuccess = ChatController.message.uploadSuccess(
        data, // encoding response
        message,
      );

      setMessages((messages) => {
        return ChatController.messages.updateMessage(
          messages,
          ChatController.message.createMessageSuccess({
            ...messageSuccess,
            file_id: data.id,
          }),
        );
      });
    }, 10000);
  }

  function handleError(error) {
    alert(error.message);
  }

  function handleMaxRecorderSize(notification) {
    alert(notification.message, notification.metaData);
  }

  const [size, setSize] = React.useState(false);

  const style = {
    maxWidth: '100%',
  };

  console.log(messages);
  return (
    <>
      <button onClick={switchLang}>Switch Lang</button>
      <button onClick={() => setSize(!size)}>resize</button>
      <div lang={language} className="ana-plugin" style={size ? style : null}>
        <div className="plugin-content">
          <AnaReactChat
            id="anaReactChat1"
            role="user"
            language={language}
            messages={messages}
            currentUser={user}
            useVoiceRecorder
            useScreenRecorder
            useVideoRecorder
            onCreateMessage={createMessageHandler}
            onMaxRecordingSize={handleMaxRecorderSize}
            onUpdateMessage={updateMessageHandler}
            onDeleteMessage={deleteMessageHandler}
            onUpload={uploadHandler}
            onChange={changeHandler}
            onError={handleError}
          />
        </div>
      </div>
    </>
  );
}

export default App;
