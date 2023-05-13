import React, {useRef} from 'react';

function App() {

    /* This thing animates the blob and the lines in the background */
    const blobRef = useRef(null);
    const gridBgRef = useRef(null);

    const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
        const blob = blobRef.current as unknown as HTMLDivElement;
        const {clientX, clientY} = e;
        const s128px = 30 * 16 / 2;
        blob.animate({
            left: `${clientX - s128px}px`,
            top: `${clientY - s128px}px`,
        }, {duration: 1500, easing: "ease-in", fill: "forwards"});

        const dottedBg = gridBgRef.current as unknown as HTMLDivElement;
        dottedBg.animate({
            backgroundPosition: `${-(clientX / window.innerWidth) - 50}% ${-(clientY / window.innerHeight) - 50}%`
        }, {duration: 1000, fill: "forwards"});
    };

    return (
        <main className="app" onPointerMove={handlePointerMove}>
            <section className={"app__background"}>
                <div ref={blobRef} className={"app__background__blob"}/>
                <div className={"app__background__blur-layer"}/>
                <div ref={gridBgRef} className={"app__background__dashed-layer"}/>
                <div className={"app__background__overlay"}/>
            </section>
            <section className={"app__container"}>

            </section>
        </main>
    );
}

export default App;
