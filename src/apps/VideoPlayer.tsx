export default function VideoPlayer() {
  return (
    <div className="h-full bg-black flex items-center justify-center">
      <iframe
        className="w-full h-full"
        src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=4W9BkLVgzG22IBQ2"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </div>
  )
}
