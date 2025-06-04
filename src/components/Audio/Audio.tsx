import { forwardRef, type Ref } from "react";

const Audio = forwardRef(({ source }: { source: string | null }, ref: Ref<HTMLAudioElement>) => {
  return (
    <div>
      <audio id="audio" ref={ref}>
        {source && <source src={`/assets/sound/${source}.mp3`} type="audio/mpeg" />}
        Your browser does not support the audio element.
      </audio>
    </div>
  );
});

export default Audio;
