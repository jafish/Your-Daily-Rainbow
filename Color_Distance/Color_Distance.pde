/**
 * creating image based color palettes and color decimation through means
 * of using a histogram.
 */

/* 
 * Copyright (c) 2010 Karsten Schmidt
 * 
 * This demo & library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 * 
 * http://creativecommons.org/licenses/LGPL/2.1/
 * 
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 * 
 * You should have received a copy of the GNU Lesser General Public
 * License along with this library; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
 */

import toxi.color.*;
import toxi.math.*;
import java.util.Iterator;
import processing.video.*;

Capture video;

PImage img, workImg;
TColor[] facebookColors;

float tolerance=0.2;

void setup() {
  size(1000, 1000);
  background(255);
  noStroke();
  //frameRate(2);

  String[] cameras = Capture.list();

  //if (cameras.length == 0) {
  //  println("There are no cameras available for capture.");
  //  exit();
  //} else {
  //  println("Available cameras:");
  //  for (int i = 0; i < cameras.length; i++) {
  //    println(cameras[i]);
  //  }
  //}

  video = new Capture(this);
  video.start(); 

  //img=loadImage("Confederate-Flag-Large-Decontrasted.jpg");
  //img=loadImage("Confederate-Flag-Large.jpg");
  //workImg=new PImage(img.width,img.height,ARGB);
  facebookColors = new TColor[6];
  facebookColors[0] = (TColor.WHITE.copy()).setARGB(#FDA094);
  facebookColors[1] = (TColor.WHITE.copy()).setARGB(#FDCC93);
  facebookColors[2] = (TColor.WHITE.copy()).setARGB(#FEEB98);
  facebookColors[3] = (TColor.WHITE.copy()).setARGB(#A2F4C0);
  facebookColors[4] = (TColor.WHITE.copy()).setARGB(#91D8FD);
  facebookColors[5] = (TColor.WHITE.copy()).setARGB(#CBB0FD);
}

void draw() {
  if (video.available() == true) {
    video.read();
    video.loadPixels();


    // The following does the same, and is faster when just drawing the image
    // without any additional resizing, transformations, or tint.
    //set(0, 0, video);

    //img=loadImage("Confederate-Flag-Large.jpg");
    workImg=new PImage(video.width, video.height, ARGB);


    TColor whiteColor=TColor.WHITE.copy();
    
    for (int i=0; i<video.pixels.length; i++) {
      whiteColor.setARGB(video.pixels[i]);
      TColor closest=whiteColor;
      float minD=100; // If this minimum is set too low, then the original pixel
      // will stay as it is, which is not what I want. I'm not going for fidelity
      // to the original image
      for (int j = 0; j < facebookColors.length; j++) {
        float d=whiteColor.distanceToRGB(facebookColors[j]);
        if (d<minD) {
          minD=d;
          closest=facebookColors[j];
        }
      }
      workImg.pixels[i]=closest.toARGB();
    }
    workImg.updatePixels();
    // display original and posterized images
    //image(video, 0, 0);
    image(workImg,0,0);
  }
  
}

void saveFrame() {
  //Save each frame to make a movie
  saveFrame("data/image-####.png");
}