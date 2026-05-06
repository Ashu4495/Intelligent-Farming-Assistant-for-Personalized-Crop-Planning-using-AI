import { useEffect } from 'react';

export default function Fireflies() {
  useEffect(() => {
    const container = document.createElement('div');
    container.className = 'fireflies';
    document.body.appendChild(container);

    for (let i = 0; i < 20; i++) {
      const ff = document.createElement('div');
      ff.className = 'firefly';
      const size = Math.random() * 4 + 2;
      ff.style.width = size + 'px';
      ff.style.height = size + 'px';
      ff.style.left = Math.random() * 100 + '%';
      ff.style.animationDuration = (Math.random() * 25 + 20) + 's';
      ff.style.animationDelay = (Math.random() * 15) + 's';
      container.appendChild(ff);
    }

    return () => container.remove();
  }, []);

  return null;
}
