# Open CMS

### What is it?

It's your CMS! Well the community's CMS. It's 100% open source so you can take a peak under the hood and tweak it to your liking or you can just use it as is. No need to create your own for scratch, I've done it for you.

The purpose for making this was so you can have a front end for the CMS YOU want to make. The entire front end is themified so you can adjust the colors to fit your wants/needs and you can add a logo to trulymake it yours. Open CMS does take your data and send it to wherever you need it to go. You take care of the back end and Open CMS takes the front end. 

### How to use with other routers!

Coming soon.


### Props

| Prop Name		 | Type               | Required?							| Default               |
|--------------|--------------------|-----------------------|-----------------------|
| routes			 | array (see below)  | Yes										| none                  |
| apiAddress	 | string             | No										| http://localhost:8080 |
| theme				 | object (see below) | No										| {}                    |
| logo				 | string             | No										| null                  |
| components	 | array (see below)  | No										| []                    |
| locked			 | boolean						| No										| false									|
| userCmsProps | see below					| Only access attribute | { access: false }			|
| gateProps		 | see [`react-gate-duo`](https://www.npmjs.com/package/react-gate-duo) | No                    | none                  |


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

| ThemeColor  | Default     |
|-------------|-------------|
| danger      | `#f6511dff`	|
| secondary   | `#00a6edff`	|
| success     | `#7fb800ff`	|
| warning     | `#ffb400ff`	|
| pageColor   | `#d4e4ff`		|
| headerColor | `#ffffff`		|


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
    "type": "link"
  }
]
```
## User Admin Panel

After some feedback from a colleague, it was noticed that this CMS was missing something important. A User Admin Panel. A place for you to deal with your current users. __PLEASE NOTE__ if needed I'll add a way to add users. 

### What can I do on this panel?

- View your current users
- Reset Passwords
- Delete Users (Not by bulk)


#### Viewing Users

In order to view the data YOU want to see, you just need to provide an array of objects with a name and a key. For example:

```javascript
[
  {
    name: "First Name",
    key: "firstName"
  },
  {
    name: "Email",
    key: "email"
  }
  // etc
]
```

This is needed to help generate a chart and pull in the data from your response from your API. The name is what displays in a chart format and the key is what goes into your data and pulls it out. 

#### User CMS Props

| Prop			         | Type														 | Description																							          | Default																																		 |
|--------------------|---------------------------------|--------------------------------------------------------------------|----------------------------------------------------------------------------|
| access						 | boolean												 | For the user cms page to be available															| false
| userConfig				 | [{ name: string, key: string }] | An array of objects that help how user data is displayed           | ``[{ name: "First Name", key: "firstName" }, ...one for last name and email]`` |
| userRoute					 | string													 | A route for the CMS to hit when getting, updating, and/or deleting | `/cms/users`																															 |
| passwordResetRoute | string													 | A route for the CMS to use to reset a user's password							| `/reset/password`


## Locking the CMS

If you wanted to make sure no one has access to the CMS there is an option for that. The CMS uses [`react-gate-duo`](https://www.npmjs.com/package/react-gate-duo) to gate off your CMS from anyone.

``` jsx
  <OpenCms 
		locked={true} 
		gateProps={{ // Refer to React Gate Duo props
			credentials: {username: "administrator", password: "aSuperDuperPassword"} 
		}}
	/>
```

| Prop        | Type    | Description                                        | Default                                              |
|-------------|---------|----------------------------------------------------|------------------------------------------------------|
| locked      | boolean | Tells the CMS that you want the pages to be locked | false                                                |


## What's left?

Well follow the table :P

| Todo                       | In Progress         | Done																					|
|----------------------------|---------------------|----------------------------------------------|
| Theming                    |										 | :heavy_check_mark: (still in progress)				|
| Basic Components           |                     | :heavy_check_mark:														|
| Custom Components          |                     | :heavy_check_mark:														|
| Nested Components          |                     | :heavy_check_mark:														|
| Image Upload               | :heavy_check_mark:  |																							|
| Sending Data               |                     | :heavy_check_mark:														|
| Mobile View                |                     |																							|
| Testing with Other Routers |                     |																							|
| General Testing            | :heavy_check_mark:  |																							|
| This Readme                | :heavy_check_mark:  |																							|
| User Admin Panel           |                     | :heavy_check_mark:														|
| Lock Down Panel            |                     | :heavy_check_mark:														|
| Screenshots								 | :heavy_check_mark:  |																							|



## Please keep in mind that this is all still WIP

*Screenshots to come!*



