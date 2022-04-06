from django.http import HttpResponse
import requests
import typing 
import os

def_complex_search_url = "https://api.spoonacular.com/recipes/complexSearch"
api_key = os.environ.get("spoonacular_api_key")

def parse_paramls(param_ls: list = None) -> str:
    """
    paramls should a list of tuples containing two strings: (parameter name, parameter value)
    """
    paramstr = ""
    for p in param_ls:
        paramstr+= ("&"+str(p[0])+"="+str(p[1]))

    return paramstr


def complex_search(query: str, paramls: list = None) -> int:
    """
    Notice that the json will contain 'results', 
    """
    complex_search_url = def_complex_search_url+""  

    complex_search_paramstr= parse_paramls(paramls)

    complex_search_url = complex_search_url + "?query=" + query + "&apiKey=" + api_Key + complex_search_paramstr
    r = requests.get(complex_search_url)
    content = dict(r.json())
    print("The following are the results from the complex search: \n\n" )

    print( content["results"])

    return content



def_spooncular_url = "https://api.spoonacular.com/"

def spooncular_function(functionality: str, query: str, paramls: list = None) -> int:
    """
    valid functionality will be either "recipes", "food/ingredients", 
    "food/products", "food/menuiItems", "mealplanner", "food/wine", "food/search" 
    This is actually an individual function, "food/images", and many others.
    """
    spooncular_url = def_spooncular_url+"" + functionality

    spooncular_search_paramstr= parse_paramls(paramls)

    spooncular_url = spooncular_url + "?query=" + query + "&apiKey=" + api_Key + spooncular_search_paramstr
    r = requests.get(spooncular_url)
    content = dict(r.json())
    print("The following are the results from the function: \n\n" )

    print(content["results"])

    return 1

def search(request, recipe_query, page_num = 1):
    """ Pass the API to search here! """
    pass

#For Recipe: Complex Search
query_example_1 = "pasta"
param_ls1 = [("cuisine", "italian"), ("excludeCuisine", "greek"), ("diet", "vegetarian")]

content_1 = complex_search(query_example_1, param_ls1)

query_example_2 = "salad"
param_ls2 = [("cuisine", "italian"), ("excludeCuisine", "greek"), ("diet", "vegetarian")]

content_2 = complex_search(query_example_2, param_ls2)

print(content_1)
print(content_2)

#For Spooncular Function
#TRY TO DO THIS LATER TN
#Spooncular_example_1 = "pasta"
#Spoon_param_ls1 = [("cuisine", "italian"), ("excludeCuisine", "greek"), ("diet", "vegetarian")]
#Functionality_1 = "recipes"
#Function_1 = "complexSearch"

#spoon_content_1 = spooncular_function(Functionality_1, Function_1, Spooncular_example_1, Spoon_param_ls1)

#print(spoon_content_1)

