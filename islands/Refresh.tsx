// islands/Refresh.tsx

/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { useEffect, useState } from "preact/hooks";

export default function Refresh(props: { target: string }) {
  const target = new Date(props.target);
  const [now, setNow] = useState(new Date()); 
  useEffect(() => {
    const timer = setInterval(() => {
      setNow((now) => {
        if (now > target) clearInterval(timer);
        return new Date();
      });        
    }, 1000);
    return () => clearInterval(timer);
  }, [props.target]);

  if (now > target) {
    console.log('Refreshing...');
    window.location.reload();
  }  
  const delay = Math.floor((target.getTime() - now.getTime()) / 1000) + 1;
  return <span>Refresh in {delay} s...</span>;
}