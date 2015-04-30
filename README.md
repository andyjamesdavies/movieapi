#MovieAPI

Creating a simple API in golang that will return info about movies

#Spec
*GET /films/list?with="ACTOR_NAME"&on="[ARR_OF_SUPPLIERS]"&in="LOCATION"*
    
RETURNS:
```
    [
    	{
    		movie_id: string
    		movie_name: string
    		movie_artwork: string
    		movie_rating: string
    	},
    	{
    	...
    	}
    ]
```

*GET /film/detail/[movie_id]*

#Setup
1. Install docker
	- Mac OSX: https://docs.docker.com/installation/mac/
2. Run: ./buildscripts/setup.sh
3. Open url 'http:// [boot2docker ip] :8000' in your browser

#TODO:
- Create a simple API interface
	- http://thenewstack.io/make-a-restful-json-api-go
	- http://www.reddit.com/r/golang/comments/1yh6gm/new_to_go_trying_to_select_web_framework/
	- http://www.gorillatoolkit.org/
- Create a simple Database that talks to API interface
- Get data for API and store in database