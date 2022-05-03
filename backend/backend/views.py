from django.http import JsonResponse
import requests
import typing
import os
import json
from .models import Auth, User, Review

# import todoist


def_complex_search_url = "https://api.spoonacular.com/recipes/complexSearch"
def_get_info_url = "https://api.spoonacular.com/recipes/"
# GET https://api.spoonacular.com/recipes/{id}/information
api_Key = os.environ.get("SPOONACULAR_API_KEY")


def ping(request):
    return JsonResponse({"status": "Ok!"})


def parse_paramls(param_ls: list = None) -> str:
    """
    paramls should a list of tuples containing two strings: (parameter name, parameter value)
    """
    paramstr = ""
    for p in param_ls:
        paramstr += ("&" + str(p[0]) + "=" + str(p[1]))

    return paramstr


def complex_search(query: str, paramls: list = None):
    """
    Notice that the json will contain 'results', 
    """
    complex_search_url = def_complex_search_url + ""

    complex_search_paramstr = parse_paramls(paramls)

    headers = {
        'x-api-key': api_Key
    }

    complex_search_url = complex_search_url + "?query=" + "_".join(query.split("%20")) + complex_search_paramstr
    r = requests.get(complex_search_url, headers=headers)
    content = dict(r.json())
    return content


def get_info(query_id: str, paramls: list = None):
    ##TBD
    """
    Notice that the json will contain 'results', 
    """
    get_info_url = def_get_info_url + ""

    get_info_paramstr = parse_paramls(paramls)

    get_info_url = get_info_url + query_id + "/information?" + "&apiKey=" + api_Key + get_info_paramstr
    r = requests.get(get_info_url)
    content = dict(r.json())
    # print("The following are the results from the get info: \n\n")

    # print(content["results"])
    # print(api_Key)

    return content


def_spooncular_url = "https://api.spoonacular.com/"


def spooncular_function(functionality: str, query: str, paramls: list = None) -> int:
    """
    valid functionality will be either "recipes", "food/ingredients", 
    "food/products", "food/menuiItems", "mealplanner", "food/wine", "food/search" 
    This is actually an individual function, "food/images", and many others.
    """
    spooncular_url = def_spooncular_url + "" + functionality

    spooncular_search_paramstr = parse_paramls(paramls)

    headers = {
        'x-api-key': api_Key
    }

    spooncular_url = spooncular_url + "?query=" + "_".join(query.split("%20")) + spooncular_search_paramstr
    r = requests.get(spooncular_url, headers=headers)

    return 1


def search(request, recipe_query, page_num=1):
    if recipe_query != "undefined":
        # for next time: use a dictionary for keys because we use that across the web
        response = complex_search(recipe_query, [("sort", "meta-score"), ("offset", (page_num - 1) * 10)])
        # print(response)
        if "status" in response and response["status"] == "failure":
            return JsonResponse({
                "Error": "Invalid Spoonacular API Key!"
            }, status=401)
        elif "total_results" in response and response["total_results"] == 0:
            return JsonResponse({
                "Error": "No results."
            })
        else:
            return JsonResponse(response)
    return JsonResponse({
        "Error": "Empty query"
    }, status=200)  # Needs to be 200 in order to fix the initial basic query


def information(request, info_query, page_num=0):
    if info_query != "undefined":
        return JsonResponse(get_info(str(info_query), [("offset", page_num * 10 - 10)]))
    return ping(request)

def get_recipes(request, recipe_id):
    if request.method == "POST":
        r = Review.objects.get(id=recipe_id)
        return JsonResponse({"ids": r})
    else:
        return JsonResponse({}, status=204)

def write_review(request):
    if request.method == "POST":
        review_obj = Review(username = request.username, item=request.review_id, review=request.review_text)
        review_obj.save()
        return JsonResponse({}, 200)
    else:
        return JsonResponse({}, 204)

def start_query(request):
    if request.method == "POST":
        print(request.body)
        body = json.loads(request.body.decode('utf8').replace("'", ""))
        state = body['state']
        auth_object = Auth(state=body['state'])
        auth_object.save()
        print(Auth.objects.filter(state=body['state']))
        return JsonResponse({"state": state, "client_id": os.environ.get("TODOIST_CLIENT_ID")})
    else:
        return JsonResponse({}, status=204)


def auth(request):
    if request.method == "POST":
        body = json.loads(request.body.decode('utf8').replace("'", ""))
        state = body['state']
        print(state)
        try:
            r = Auth.objects.get(state=state)
            print(r)
            if r.state == state:
                req = requests.post("https://todoist.com/oauth/access_token", data={
                    "client_id": os.environ.get("TODOIST_CLIENT_ID"),
                    "client_secret": os.environ.get("TODOIST_CLIENT_SECRET"),
                    "code": body["code"],
                    "grant_type": "authorization_code"
                })
                info = req.json()
                if "error" in info:
                    return JsonResponse({"error": "Authorization failed"}, status=401)
                u = User(token=info["access_token"])
                r.delete()
                u.save()
                return JsonResponse(info)
            else:
                return JsonResponse({"error": "State not found"}, status=401)
        except Auth.DoesNotExist:
            return JsonResponse({"error": "State not found"}, status=401)
        except IndexError:
            return JsonResponse({"error": "State not found"}, status=401)
    else:
        return JsonResponse({}, status=204)


""""
def add_item(self, content, **kwargs):
        #function to create a new task
        #From : https://github.com/Doist/todoist-python/blob/main/todoist/api.py
        params = {"token": self.token, "content": content}
        params.update(kwargs)
        if "labels" in params:
            params["labels"] = str(params["labels"])
        return self._get("add_item", params=params)
"""


def create_list(request):
    if request.method != "POST":
        return JsonResponse({"status": "POST method only."}, status=204)

    try:
        body = json.loads(requests.body.decode('utf8').replace("'", ""))
        test_token = User.objects.filter(token=body["token"]).exists()
        if not test_token:
            return JsonResponse({"error": "Token not found"}, status=404)
        recipe_name = body["recipe_name"]
        ingredients = body["ingredients"]
        url = body["url"]
    except KeyError:
        return JsonResponse({"error": "Payload requires recipe name, ingredients, an access token, and URL."}, status=401)

    header = {"Authorization": body["token"]}

    r2 = requests.post("https://api.todoist.com/rest/v2/tasks",
                       data={"content": recipe_name, "description": url},
                       headers=header)
    if r2.status_code != 200:
        return JsonResponse({"error": "Could not add recipe task"}, status=500)
    info = r2.json()

    parent_id = info["id"]
    for ingredient in ingredients:
        post_subtask = requests.post("https://api.todoist.com/rest/v2/tasks",
                                     data={"content": ingredient, "parent_id": parent_id},
                                     headers=header)
        if post_subtask.status_code != 200:
            return JsonResponse({"error": "Could not add ingredient task"}, status=500)
    return JsonResponse({"status": "Successfully added tasks!"})

# For Recipe: Complex Search
# query_example_1 = "pasta"
# param_ls1 = [("cuisine", "italian"), ("excludeCuisine", "greek"), ("diet", "vegetarian")]
#
# content_1 = complex_search(query_example_1, param_ls1)
#
# query_example_2 = "salad"
# param_ls2 = [("cuisine", "italian"), ("excludeCuisine", "greek"), ("diet", "vegetarian")]
#
# content_2 = complex_search(query_example_2, param_ls2)
