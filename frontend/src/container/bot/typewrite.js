import React from 'react'
import './bot.css'
import Typewriter from 'typewriter-effect';

export default function typewrite({msg}) {

return <Typewriter
options={{
    delay: 10,
  }}
onInit={(typewriter) => {
  typewriter.typeString(msg)
    .start();
}}
/>
}
