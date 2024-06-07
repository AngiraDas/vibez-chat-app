import React from 'react'
import Sidebar from './Sidebar'
import Chatbox from './Chatbox'

export default function Home() {
  return (
    <div className="flex sm:h-[460px] md:h-[580px] rounded-lg overflow-hidden  bg-clip-padding backdrop-filter backdrop-blur-lg bg-opac">
      <Sidebar />
      <Chatbox />
    </div>
  );
}
