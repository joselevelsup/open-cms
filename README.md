# Open CMS

### What is it?

It's your CMS! Well the community's CMS. It's 100% open source so you can take a peak under the hood and tweak it to your liking or you can just use it as is. No need to create your own for scratch, I've done it for you.

The purpose for making this was so you can have a front end for the CMS YOU want to make. The entire front end is themified so you can adjust the colors to fit your wants/needs and you can add a logo to trulymake it yours. Open CMS does take your data and send it to wherever you need it to go. You take care of the back end and Open CMS takes the front end. 

### How to use with other routers!

Coming soon.


### Props

| Prop Name  | Type							  | Required? | Default							  |
|------------|--------------------|-----------|-----------------------|
|	routes		 | array (see below)	| Yes			  | none									|
| apiAddress | string						  | No				| http://localhost:8080 |
| theme			 | object (see below) | No        |	{}									  |
| logo			 | string						  | No        | null                  |
| components | array (see below)  | No			  | []                    |


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

#### Custom Components

Open CMS tries to make Custom Components simple to add. There are already components that come by default but you can add your own in case some were missed. For instance, I'm going to add a markdown editor using `react-markdown-editor-lite`. A name, a slug, and the actual component must be added. The component must be wrapped in a function to pass props into your component.

You only need to pass 2 props into your custom component. 
1. `onComponentChange` - this is a function that takes any data you pass to it and the name of the component. It's important that you pass both.
2. `name` - this is just the name the CMS gives your custom component. This name can change based on the position or if it is nested. 
```javascript
const customComponents = [
	{
		name: "myComponent",
		slug: "my-component",
		component: ({ onComponentChange, name }) => {
			const mdParser = new MarkdownIt();
			return (
				<MdEditor
					value=""
					style={{ height: "500px" }}
					renderHTML={(text) => mdParser.render(text)}
					onChange={(data) => onComponentChange(data.text, name)}
				/>
			)
		}
	}
]

<OpenCms components={customComponents} />
```
### Example Data Submission
```javascript
[
  {
    "id": 1,
    "title": "short title",
    "slug": "short-title",
    "value": "short value",
    "type": "short-text"
  },
  {
    "id": 2,
    "title": "nested title",
    "slug": "nested-title",
    "components": [
      {
        "id": 1,
        "title": "this-is-a-nested-title",
        "value": "this is a nested value",
        "type": "short-text"
      }
    ],
    "type": "nested"
  },
  {
    "id": 3,
    "title": "linked title",
    "slug": "linked-title",
    "value": "http://google.com",
    "type": "link-3"
  }
]
```


## What's left?

Well follow the table :P

| Todo								        | In Progress									| Done	|
|-----------------------------|-----------------------------|-------|
| Theming								      |	:heavy_check_mark: (but some currently work)	| 			|
| Basic Components						|															|	:heavy_check_mark:			|
| Custom Components						|															| :heavy_check_mark:			|
| Nested Components						|															| :heavy_check_mark:			|
| Image Upload								|	:heavy_check_mark:					|				|
| Sending Data								| :heavy_check_mark:					|				|
|	Mobile View									|															|				|
|	Testing with Other Routers	|															|				|
| This Readme									|	:heavy_check_mark:					|				|



## Please keep in mind that this is all still WIP



