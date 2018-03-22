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
    
    // interactive control element to start the intro sequence
    this.startcontrol = $('.start');

    // interactive control element to skip the intro sequence
    this.skip = $('.skip');

    // interactive control element to restart the intro sequence
    this.restart = $('.restart');
    
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
//    this.getready();

    // Start the animation on click
    this.startcontrol.bind('click', $.proxy(function() {
      this.go();
    }, this));

    // Start the animation on click
    this.restart.bind('click', $.proxy(function() {
      this.go();
    }, this));
    
    // Stop the animation on click
    this.skip.bind('click', $.proxy(function() {
      this.reset();
    }, this))


    StarWars.prototype.go = function () {
      this.startcontrol.hide();
      this.restart.hide();
      this.photobox.hide();
      this.skip.show();
      this.audio.play()
      this.el.append(this.animation);
    }
  
    // At the end of the audio track, reset the animation and show the photobox
    $(this.audio).bind('ended', $.proxy(function() {
      this.reset();
    }, this));
  }

StarWars.prototype.getready = function() {
  console.log("getready fired");
  this.prep();
  this.startcontrol.show();
  this.photobox.hide();
  this.skip.hide();
  this.restart.hide();
}

StarWars.prototype.prep = function() {
  console.log("prep fired");
  this.cloned = this.animation.clone(true);
  this.animation.remove();
  this.animation = this.cloned;
  this.audio.pause();
  this.audio.currentTime = 0;
}

  /*
   * Resets the animation and shows the photobox.
   */
  StarWars.prototype.reset = function() {
    console.log("reset fired")
    this.prep();
    this.startcontrol.hide();
    this.skip.hide();
    this.restart.show();
    this.photobox.show();
  };

  return StarWars;
})();

MySW = new StarWars({
  el : '.starwars'
});

$(document).ready(function() {MySW.getready();})
