# Starting_template

Starting template is a front-end HTML5/SCSS/JS template. Featuring the latest technologies and impeccable code this download is the ideal starting point for any web project.

## Gulp - Start Guide
> **Need to ensure you have everything on your machine:**<br>
>1. Node.js<br>
>2. npm<br>
>3. Bower<br>

**In root of template, use commands:**
<ul>
	<li>npm i</li>
	<li>bower i</li>
	<li>gulp (Run project)</li>
	<li>gulp build (Build project)</li>
</ul>

### SASS Partials
<p>The partials directory is where most of the CSS is constructed. Plan ahead and think how to structure these.</p>
<ul>
	<li>components:
	<ul>
		<li>_global.scss</li>
		<li>_variables.scss</li>
	</ul>
	</li>
	<li>helpers:
	<ul>
		<li>_global.scss</li>
		<li>_extends.scss</li>
		<li>_media.scss</li>
		<li>_mixins.scss</li>
	</ul>
	</li>
	<li>sections:
	<ul>
		<li>_header.scss</li>
		<li>_footer.scss</li>
	</ul>
	</li>
	<li>vendors:
	<ul>
		<li>_global.scss</li>
		<li>_bootstrap-grid.scss</li>
	</ul>
	</li>
	<li>main.scss</li>
</ul>

###Automatically sprite generation
<p>Example of Sprite using</p>
```
    .selector {
        @include sprite($apple-touch-icon);
    }
```
> **apple-touch-icon** - the name of image

###Structuring your projects
<p>This is a developer preference. There is no official way. Do you want all your pages in partials? Would you rather just add main components and still use style.scss for the bulk of the CSS? Do what's best for you and your project.</p>

###Who's behind this?
<p>Base is proudly made by Evgeny Kovalchuk and is the result of many hours working on projects of all sizes. It is driven by a massive enthusiasm for all things web.
</p>
<p>Base is constantly updated and modified to ensure it stays on top of the game. If you’ve any suggestions or ideas then don’t hesitate to get in touch.</p>

----------
###Author's profile in social networks:
| Profile:         | Link:								                    |
 ----------------- | ----------------------------------------------------------------------------------------
| LinkedIn: 	   | <a href="http://www.linkedin.com/in/evgenykovalchuk" target="_blank">linkedin.com</a>  |
| VK:              | <a href="http://vk.com/silent_control" target="_blank">vk.com</a>                      |
| Facebook:        | <a href="https://www.facebook.com/silentc0ntr0l" target="_blank">facebook.com</a>      |
|Twitter:          | <a href="https://twitter.com/KovalchukEvgeny" target="_blank">twitter.com</a>          |
