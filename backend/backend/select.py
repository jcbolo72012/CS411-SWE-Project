#The user should be able to search and modify a recipe from spoonacular.

"""After the user views all possible search results, there should be a checkbox after recipes that allow the user to “Select” recipes they want.
Also there will be a “Modify” button if the user wants to modify the recipe they selected.
If the user clicks the “Modify” button, a dropdown will pop out at the same page. It will show all ingredients for selected recipes. It allows the user to modify ingredients quantity for recipes.
Once the user modifies recipes, there will be a “Save” button that allows the user to save their new recipe and close the window.
After the user satisfies their recipes, they can place their order from Instacart.(see Story 4)

Exceptions: 
There should be a limit for ingredients quantity that users can add. 
If the user sets an unreasonable amount of a ingredient (Ex: “Egg *100”), it will show a message “Quantity out of limit”. 
If the user orders 0 items, it will delete that item from the recipe.
"""

#Searching is complete. Next we want to modify a recipe. 
# Given the certain ingredients provide a reasonable range for the list of ingredients. 
# And return the recipe with modified list of ingredients. 

def modify(recipe_id: str, ingredient_ls: list, modify_ls):
    """
    We assume that the ingredient list is the whole list of tuples : (ingredients_name)
    TBD
    """
    
    for x in ingredient_ls:
        pass

    return ingredient_ls