/*
 * Star Wars opening crawl from 1977
 * 
 * I freaking love Star Wars, but could not find
 * a web version of the original opening crawl from 1977.
 * So I created this one.
 *
 * I wrote an article where I explain how this works:
 * http://timpietrusky.com/star-wars-opening-crawl-from-1977
 * 
 * Watch the Start Wars opening crawl on YouTube.
 * https://www.youtube.com/watch?v=7jK-jZo6xjY
 * 
 * Stuff I used:
 * - CSS (animation, transform)
 * - HTML audio (the opening theme)
 * - SVG (the Star Wars logo from wikimedia.org)
 *   http://commons.wikimedia.org/wiki/File:Star_Wars_Logo.svg
 * - JavaScript (to sync the animation/audio)
 *
 * Thanks to Craig Buckler for his amazing article 
 * which helped me to create this remake of the Star Wars opening crawl. 
 * http://www.sitepoint.com/css3-starwars-scrolling-text/ 
 *
 * Sound copyright by The Walt Disney Company.
 * 
 *
 * 2013 by Tim Pietrusky
 * timpietrusky.com
 * 
 * 2018 heavy revisions by Andrew Nicklin
 * nicklin.info
 * 
 */
StarWars = (function() {
  
  /* 
   * Constructor
   */
  function StarWars(args) {
    // Context wrapper
    this.el = $(args.el);
    
    // Audio to play the opening crawl
    this.audio = this.el.find('audio').get(0);
    
    // interactive element to restart the intro sequence
    this.start = $('.restart');

    // interactive element to skip the intro sequence
    this.skip = $('.skip');
    
    // The animation wrapper
    this.animation = this.el.find('.animation');

    // The photobox
    this.photobox = $('.photobox');

    // The link to the photo album
    this.photos = $('.photos');

    this.photos.bind('click', $.proxy(function(){
      window.location.href='https://photos.app.goo.gl/ooPwLr856HWFB1oT2'
    }));
    
    // Remove animation and shows the start screen
    //this.reset();

    // Start the animation on click
    this.start.bind('click', $.proxy(function() {
      this.go();
    }, this));

    // Stop the animation on click
    this.skip.bind('click', $.proxy(function() {
      this.reset();
    }, this))

    StarWars.prototype.go = function () {
      this.start.hide();
      this.skip.show();
      this.photobox.fadeOut(duration=2);
      this.audio.play()
      this.el.append(this.animation);
    }
  
    // At the end of the audio track, reset the animation and show the start screen
    $(this.audio).bind('ended', $.proxy(function() {
      this.reset();
    }, this));
  }
  
  /*
   * Resets the animation and shows the start screen.
   */
  StarWars.prototype.reset = function() {
    this.photobox.show();
    this.skip.hide();
    this.start.show();
    this.cloned = this.animation.clone(true);
    this.animation.remove();
    this.animation = this.cloned;
    this.audio.pause();
    this.audio.currentTime = 0;
  };

  return StarWars;
})();

MySW = new StarWars({
  el : '.starwars'
});

$(document).ready(function() {MySW.go();})
