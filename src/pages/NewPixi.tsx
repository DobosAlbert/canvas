import React, { useEffect, useRef, useState } from 'react';
import * as PIXI from 'pixi.js';

import image1 from './images/omulet.svg';//omu
import image2 from './images/workspace.png';//tv-ul
import image3 from './images/6663360-transformed.png';//floarea 
import image4 from './images/1247374f523df80.png';//
import image5 from './images/834825_preview.jpg';
import image6 from './images/cupboard-transformed.png';
import image7 from './images/garbage-bin.png';
import image8 from './images/clock.png';

const PixiComponent: React.FC<Props> = ({children}) => {
    const gameCanvas = useRef<HTMLDivElement | null>(null);
    const sprites = useRef<PIXI.Sprite[]>([]);
    const backgroundSprite = useRef<PIXI.Sprite | null>(null);
    const [showModal1, setShowModal1] = useState(false); // State pentru a controla afișarea primului modal
    const [showModal2, setShowModal2] = useState(false); // State pentru a controla afișarea celui de-al doilea modal

    const app = new PIXI.Application({
        width: window.innerWidth * 0.4,
        height: window.innerHeight * 0.75,
        backgroundColor: 0xFFFFFF,
        antialias: true
    });

    useEffect(() => {
        if (gameCanvas.current) {
            gameCanvas.current.appendChild(app.view as unknown as Node);
    
            const backgroundTexture = PIXI.Texture.from(image5);
            const sprite = new PIXI.Sprite(backgroundTexture);
            app.stage.addChild(sprite);
    
            backgroundSprite.current = sprite;
    
            const textures = [
                PIXI.Texture.from(image1),
                PIXI.Texture.from(image2),
                PIXI.Texture.from(image3),
                PIXI.Texture.from(image4),
                PIXI.Texture.from(image6),
                PIXI.Texture.from(image7),
                PIXI.Texture.from(image8)
            ];
    
            sprites.current = textures.map((texture, index) => {
                const sprite = new PIXI.Sprite(texture);
                
                if (index === 2) {
                    sprite.interactive = true;
                    sprite.on('pointerdown', () => setShowModal1(true));
                }

                // Dacă este `image8`, adaugă un ascultător de evenimente pentru click
                if (index === 3) {
                    sprite.interactive = true;
                    sprite.on('pointerdown', () => setShowModal2(true));
                }

                app.stage.addChild(sprite);
                return sprite;
            });
    
            window.addEventListener("keydown", handleKeydown);
            window.addEventListener('resize', resize);
    
            resize();
        }
    
        return () => {
            window.removeEventListener("keydown", handleKeydown);
            window.removeEventListener('resize', resize);
        }
    }, []);

    const handleKeydown = (e: KeyboardEvent) => {
        const speed = 10; // viteză în pixeli
        const sprite = sprites.current[0]; // presupunem că image1 este primul sprite în array
    
        switch(e.key) {
            case "d":
                sprite.x += speed;
                break;
            case "a":
                sprite.x -= speed;
                break;
            case "w":
                sprite.y -= speed;
                break;
            case "s":
                sprite.y += speed;
                break;
        }
    }

    const resize = () => {

        app.renderer.resize(window.innerWidth * 0.65, window.innerHeight * 0.75); // Ajustează dimensiunile renderer-ului la dimensiunile ferestrei

        if (backgroundSprite.current) {
            backgroundSprite.current.width = window.innerWidth * 0.66;
            backgroundSprite.current.height = window.innerHeight * 0.75;
            backgroundSprite.current.x = 0;
        }
    
        const sizes = [20, 9, 9.09, 6, 6, 9, 20, 3];
        const heights = [3, 3, 3.22, 4, 2.5, 8, 7, 2];
        const widths = [12, 14, 1.8, 4.3, 2.1, 2.2, 3, 2.7];
        const positions = [2.3, 2, 2, 4, 60, 1.3, 50, 100000];
    
        for (let i = 0; i < sprites.current.length; i++) {
            if (sprites.current[i]) {
                sprites.current[i].width = window.innerWidth / sizes[i];
                sprites.current[i].height = (window.innerHeight * 0.75) / heights[i];
                sprites.current[i].x = window.innerWidth / widths[i];
                sprites.current[i].y = window.innerHeight / positions[i];
            }
        }
    }        

    return (
        <div style={{
            position: 'relative',
            height: '100%',
            width: '100%',
            backgroundColor: 'yourBackgroundColorHere' // background color of your choice
        }}>
            <div ref={gameCanvas}>
                {children}
            </div>

            {/* Primul modal */}
            {showModal1 && (
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',  // semi-transparent background
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1000,
                }}>
                    <div style={{
                        backgroundColor: 'white',
                        padding: '1em',
                        borderRadius: '0.5em',
                        maxWidth: '80%',
                    }}>
                        <h2>Modal Content for Image 3</h2>
                        <button onClick={() => setShowModal1(false)}>Close</button>
                    </div>
                </div>
            )}

            {/* Al doilea modal */}
            {showModal2 && (
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '114%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',  // semi-transparent background
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1000,
                }}>
                    <div style={{
                        backgroundColor: 'white',
                        padding: '1em',
                        borderRadius: '0.5em',
                        maxWidth: '80%',
                    }}>
                        <h2>Modal Content for Image 4</h2>
                        <button onClick={() => setShowModal2(false)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}

interface Props{
    children: React.ReactNode
}

export default PixiComponent;
