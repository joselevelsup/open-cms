# Open CMS

### What is it?

It's your CMS! Well the community's CMS. It's 100% open source so you can take a peak under the hood and tweak it to your liking or you can just use it as is. No need to create your own for scratch, I've done it for you.

The purpose for making this was so you can have a front end for the CMS YOU want to make. The entire front end is themified so you can adjust the colors to fit your wants/needs and you can add a logo to trulymake it yours. Open CMS does take your data and send it to wherever you need it to go. You take care of the back end and Open CMS takes the front end. 

### How to use with other routers!

Coming soon.


### Props

| Prop Name | Type							 | Required? | Default							 |
|-----------|--------------------|-----------|-----------------------|
|	routes    | array (see below)	 | Yes			 | none									 |
| apiAddress|	string						 | No				 | http://localhost:8080 |
| theme     |	object (see below) | No        | none									 |
| logo      |	string						 | No        | none                  |


#### Routes

In order for the CMS to know what content is being related to what page, an array of objects needs to be passed into the CMS component. The array of objects looks like this:

```javascript
const routes = [
	{
		name: "home page", //String
		apiRoute: "/home-page" //String - this can be whatever route you want to link to
	},
	{
		name: "about page", //String
		apiRoute: "/about-page" //String - this can be whatever route you want to link to
	},
]

<OpenCms routes={routes} />
```

The CMS will always push a PUT request to whatever API route you set.


#### Theming

By default, a colorscheme has been put in place. IF you don't like it, OH WELL! No I'm just kidding. You can change it up!

```javascript
const theme = {
	danger: "orange",
	success: "lightgreen",
	pageColor: "skyblue"
};

<OpenCms theme={theme} />
```

Now this is going to keep updating and the CMS will be customizable to the toe! Stay tuned ;)


## What's left?

Well follow the table :P

| Todo								        | In Progress									| Done	|
|-----------------------------|-----------------------------|-------|
| Theming								      |	X (but some currently work)	| 			|
| Basic Components						|															|	X			|
| Custom Components						|															| X			|
| Nested Components						|															| X			|
| Image Upload								|	X														|				|
| Sending Data								| X														|				|
|	Mobile View									|															|				|
|	Testing with Other Routers	|															|				|
| This Readme									|	X														|				|



## Please keep in mind that this is all still WIP



