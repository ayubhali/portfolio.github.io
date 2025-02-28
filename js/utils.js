export function preloadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
    });
}

export function setupIntersectionObserver(element, callback, options = {}) {
    const observer = new IntersectionObserver(callback, {
        threshold: options.threshold || 0.1,
        root: options.root || null,
        rootMargin: options.rootMargin || '0px'
    });

    if (element) {
        observer.observe(element);
    }

    return observer;
}
