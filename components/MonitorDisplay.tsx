interface Props {
  src: string;
  alt: string;
}

export default function MonitorDisplay({ src, alt }: Props) {
  return (
    <div className="flex flex-col items-center select-none">
      <div className="monitor-frame">
        <div className="monitor-camera" />
        <div className="monitor-screen">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={alt} className="w-full h-full object-cover block" />
        </div>
        <div className="monitor-chin" />
      </div>
      <div className="monitor-neck" />
      <div className="monitor-base" />
    </div>
  );
}
