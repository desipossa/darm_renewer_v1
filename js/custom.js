(function () {
    //mainSloganTimeLine();
    mainTxtSLide();
    mainResSlide();
    setInterval(watch, 1000);
    mainSloganTimeLine();
    mainVisualTimeLine();
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
        slidesPerView: 3,
        slidesOffsetAfter: 200,
        edgeSwipeThreshold: 100,
        //direction: 'vertical',
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
            delay: 4000,
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
    });

    function slideTab() {
        const btn = document.querySelectorAll('#mainSlogan .slide_link button');

        btn.forEach((it, idx) => {
            it.addEventListener('click', () => {
                sl.slideToLoop(idx)
            })
        })
    }

    slideTab();

}


function mainResSlide() {
    const sl = new Swiper('.res_slide', {

    })
}

function mainSloganTimeLine() {
    const tl = gsap.timeline();
    tl.set({}, {}, '+=1');
    //tl.set('#mainSlogan .m_txt_slide', { y: -50 });
    tl.to('#mainSlogan .m_txt_slide', { rotation: 180 });
    tl.set({}, {}, '+=1');
    //tl.to('#mainSlogan .time_area', { scale: 5, autoAlpha: 0 });

    ScrollTrigger.create({
        animation: tl,
        trigger: '#mainSlogan',
        pin: true,
        scrub: 1,
        end: "+=600%",
        //markers: true
    })
}


function mainVisualTimeLine() {
    const tl = gsap.timeline();

    tl.set({}, {}, "-=2")
    tl.from('#mainVisual h2', { x: -400, });
    tl.set({}, {}, "+=1")
    tl.to('#mainVisual .mockup', { y: -100, });
    tl.set({}, {}, "+=2");
    //tl.to('#mainSlogan .time_area', { scale: 5, autoAlpha: 0 });

    ScrollTrigger.create({
        animation: tl,
        trigger: '#mainVisual',
        pin: true,
        scrub: 1,
        //start: "40% top",
        end: "+=400%",
        markers: true
    })
}





