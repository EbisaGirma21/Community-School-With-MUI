import React, { useEffect, useState } from "react";

const Map = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Handle lazy loading by setting state once the component is mounted
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="map-container">
      <iframe
        title="Wolkite University Community School (WKUCS)"
        aria-label="Wolkite University Community School (WKUCS)"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2021828.3268639888!2d36.52895266227295!3d8.214474600000017!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x17b2c7472d293b6d%3A0x498d9fe97a64c4e1!2sWolkite%20university!5e0!3m2!1sen!2set!4v1734276189861!5m2!1sen!2set"
        className="lazyload"
        width="100%"
        height="400px"
        loading="lazy"
      />
    </div>
  );
};

export default Map;
