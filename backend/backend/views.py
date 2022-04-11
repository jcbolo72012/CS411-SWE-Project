import django.http
from django.http import HttpResponse, JsonResponse
import requests
import typing
import os

def_complex_search_url = "https://api.spoonacular.com/recipes/complexSearch"
def_get_info_url =  "https://api.spoonacular.com/recipes/"
#GET https://api.spoonacular.com/recipes/{id}/information
#api_Key = os.environ.get("SPOONACULAR_API_KEY")
api_Key = "f257b3dedd0d40b988e13df0754bc639"

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

    get_info_url = get_info_url + query_id + "/information?"+ "&apiKey=" + api_Key + get_info_paramstr
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
        response = complex_search(recipe_query, [])
        print(response)
        if "status" in response and response["status"] == "failure" or \
            "total_results" in response and response["total_results"] == 0:
            return JsonResponse({
                "Error": "Invalid Spoonacular API_Key!"
            }, status=401)
        else:
            return JsonResponse(response)
    return JsonResponse({
        "Error": "Empty query"
    }, status=200)  # Needs to be 200 in order to fix the initial basic query

def information(request, info_query, page_num=0):
    if info_query != "undefined":
        return JsonResponse(get_info(str(info_query), [("offset",page_num*10 - 10)]))
    return ping(request)

# For Recipe Search: Complex Search
query_example_1 = "pasta"
param_ls1 = [("offset", 0)]
#param_ls1 = [("cuisine", "italian"), ("excludeCuisine", "greek"), ("diet", "vegetarian")]

content_1 = complex_search(query_example_1, param_ls1)

query_example_0 = "pasta"
param_ls0 = []
#param_ls1 = [("cuisine", "italian"), ("excludeCuisine", "greek"), ("diet", "vegetarian")]

content_0 = complex_search(query_example_0, param_ls0)

print(content_0)

query_example_2 = "salad"
param_ls2 = [("cuisine", "italian"), ("excludeCuisine", "greek"), ("diet", "vegetarian")]

#content_2 = complex_search(query_example_2, param_ls2)

# For Recipe Info: Information
query_example_3 = "716429"
param_ls3 = [("includeNutrition", "false")]

content_3 = get_info(query_example_3, param_ls3)
print(content_1)
# print(content_2)
# print(content_3)

# For Spooncular Function
# TRY TO DO THIS LATER TN
# Spooncular_example_1 = "pasta"
# Spoon_param_ls1 = [("cuisine", "italian"), ("excludeCuisine", "greek"), ("diet", "vegetarian")]
# Functionality_1 = "recipes"
# Function_1 = "complexSearch"

# spoon_content_1 = spooncular_function(Functionality_1, Function_1, Spooncular_example_1, Spoon_param_ls1)

# print(spoon_content_1)
