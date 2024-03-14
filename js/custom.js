(function () {
    //mainSloganTimeLine();
    mainTxtSLide();
    setInterval(watch, 1000);
    mainSloganTimeLine();
    smoothScroll();
})();


function mainVisualSlideTimeline(itm, num, slideNumber) {
    // itm.forEach(it => {
    //     gsap.to(it, { clearProps: true })
    // });

    const tl = gsap.timeline();

    // gsap.to('.can', {
    //     duration: 6,
    //     ease: 'none',
    //     background: `url(./images/beer.jpg) ${slideNumber * 100 / itm.length}% 0, url(./images/soda_mockup.png)`,
    // },)


    //tl.from(itm[1], { width: 0, rotation: 10, autoAlpha: 0, ease: 'bounce', delay: 2, duration: 0.5 });
    tl.from(itm[0], { x: 600, autoAlpha: 0, duration: 0.5, delay: 2, },);
    tl.from(itm[2], { x: 600, autoAlpha: 0, duration: 0.5 }, "-=1");
    tl.from(itm[3], { x: 600, autoAlpha: 0, duration: 0.5 });
    tl.from(itm[4], { scale: 2, autoAlpha: 0, duration: 0.5, ease: 'bounce' });
}


function smoothScroll() {
    const lenis = new Lenis()

    lenis.on('scroll', (e) => {
        console.log(e)
    })

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)
}


function watch() {
    const d = new Date();
    const h = d.getHours();
    const m = d.getMinutes();
    const s = d.getSeconds();

    document.querySelector('#mainSlogan .time_area .clock .hour').style.transform = `rotate(${h * (360 / 12)}deg)`
    document.querySelector('#mainSlogan .time_area .clock .minuite').style.transform = `rotate(${m * (360 / 60)}deg)`
    document.querySelector('#mainSlogan .time_area .clock .second').style.transform = `rotate(${s * (360 / 60)}deg)`

}


function mainTxtSLide() {

    let slideNumber = 0;

    const slides = document.querySelectorAll('#mainSlogan .swiper-slide');
    const sl = new Swiper('.m_txt_slide', {
        loop: true,
        speed: 1800,
        effect: "cube",
        grabCursor: true,
        cubeEffect: {
            shadow: true,
            slideShadows: false,
            shadowOffset: 40,
            shadowScale: 0.4,
        },
        centeredSlides: true,
        autoplay: {
            delay: 10000,
            disableOnInteraction: false,
        },
        on: {
            slideChangeTransitionStart: function () {
                //console.log(this.realIndex);
                //document.querySelector('h1').innerText = this.realIndex;
                const itms = slides[this.realIndex].querySelectorAll('.ani-itm');
                slideNumber = slideNumber + 1;
                //mainVisualSlideStartTimeline(itms, this.realIndex)
                mainVisualSlideTimeline(itms, this.realIndex, slideNumber);
            },
        }
    })
}


function mainSloganTimeLine() {
    const tl = gsap.timeline();

    tl.to('#mainSlogan .m_txt_slide', { scale: 0, });
    tl.to('#mainSlogan .time_area', { scale: 5, autoAlpha: 0 });

    ScrollTrigger.create({
        animation: tl,
        trigger: '#mainSlogan',
        pin: true,
        scrub: 1,
        end: "+=600%",
        markers: true
    })
}



