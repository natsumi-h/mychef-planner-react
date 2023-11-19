# 🥕My Chef Planner App🥕
This is a comprehensive web application that seamlessly combines two key functionalities: recipe searching, shopping list management. The aim is to simplify the cooking and grocery shopping process for users by providing a one-stop solution for meal planning and kitchen organization.

## Live URL
https://mychef-planner-react.vercel.app/

## User's Persona
### Basic Information:
* Name: Aarav
* Age: 29
* Location: Singapore

### Lifestyle:
* Busy professional with limited time for cooking and shopping.
* Heavily relies on web apps/mobile phone for organization in daily tasks.

### Needs and Challenges:
* Quick access to healthy recipes that fit his busy schedule.
* Efficient way to manage grocery shopping and avoid repetitive store visits.
* A system that helps keep track of groceries bought and what's currently in the fridge.

### App Features Desired:
* Intuitive interface for ease of use.
* Wide range of recipe options, easily searchable.
* Feature to transfer items from the "to shop" list to an "in fridge" list once purchased, helping track fridge contents.

## Screenshots
![Screenshot 2023-11-17 at 3 17 50 PM](https://github.com/natsumi-h/mychef-planner-react/assets/88537845/c62bcba4-0a40-4ab7-9c3e-699a48e0a884)
![Screenshot 2023-11-17 at 3 19 29 PM](https://github.com/natsumi-h/mychef-planner-react/assets/88537845/d6664018-7ed7-4ad9-84c4-0c99e86d118d)
![Screenshot 2023-11-17 at 3 18 05 PM](https://github.com/natsumi-h/mychef-planner-react/assets/88537845/b8588f57-0643-48fb-b107-c3c71eb498d1)
![Screenshot 2023-11-17 at 3 18 22 PM](https://github.com/natsumi-h/mychef-planner-react/assets/88537845/76f414ec-cd6b-4c01-b08f-3bd44db74726)
![Screenshot 2023-11-17 at 3 19 56 PM](https://github.com/natsumi-h/mychef-planner-react/assets/88537845/a2b5dc3a-a2d9-4ec8-ba4b-dc71b1de1398)

## Page structure
| Content  |Root  |  path1 | path2  |
|---|---|---|---|
|  Home(Recipe Search) |/   |   |   |
| Single Recipe  |   | /recipe  |/{id}   |
| Favorite*  |   | /favorite  |   |
| List*  |   | /list  |   |
| Fridge*  |   | /fridge  |   |

 *Protected route that directs to Signin screen when the user is not signed in

## Technologies Used
* Frontend framework
  * React
* Routing system
  * React Router Dom
* State management
  * useContext hooks
* Third party API's
  * [Spoonacular](https://spoonacular.com/food-api/) - To get recipe data
  * [Airtable](https://support.airtable.com/docs/airtable-web-api-using-filterbyformula-or-sort-parameters) - To store and manage user based favorite/shop/inventory list
  * [Firebase](https://firebase.google.com/) - Authentication 
* Form validation
  * [React hook form](https://www.react-hook-form.com/)
  * [Yup](https://www.npmjs.com/package/yup)
* UI Library
  * [Chakra UI](https://chakra-ui.com/) 
* Typescript

## Breakdown of Components
* 

## Next Steps
* 
