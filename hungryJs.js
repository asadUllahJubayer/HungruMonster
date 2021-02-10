// call api search by  name
const mealName = (name) => {
    
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
            .then(res => res.json())
            .then(data => displayMeal(data)) 
}
// display meals boxes 
    const displayMeal = (meal) => {
        console.log(meal)
        const mealName = meal;
        const array1 = mealName.meals;
        console.log(mealName.meals)
        const mealBox = document.getElementById('mealContainer')
        mealBox.innerHTML ="";
        array1.forEach((element) => {
            const mealDiv = document.createElement('div');
            mealDiv.className = "mealBox";
            
            const childBox = 
            `
            <img onclick="mealIndex(${element.idMeal})" src="${element.strMealThumb}" class="image">
            <h6 onclick="mealIndex(${element.idMeal})" class="recipeName">${element.strMeal} 
            </h6> 
            `
            mealDiv.innerHTML = childBox;
            mealBox.appendChild(mealDiv);                 
        })       
    }  // end display boxes  

   // element display none or block section  
   const displayNone = (id)=>{
          document.getElementById(id).style.display='none'
   }    
   const displayBlock = (id)=>{
    const db = document.getElementById(id)
        db.style.display='block'
   }   
    // call api search by id
    const mealIndex = (mealId) => {
       displayNone('meals')
       
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
            .then(res => res.json())
            .then(data => displayDetails(data.meals))
        displayBlock('details')
    }
    // end api

    // meal details function
        const displayDetails = elements => {
            const element =  elements[0]   
        const mealDetails = document.getElementById('details')
        const ingredients = []
        for (let i = 1; i <= 20; i++) {
            if (element[`strIngredient${i}`]) {
                ingredients.push(
                    `${element[`strIngredient${i}`]} - ${element[`strMeasure${i}`]}`
                );
            } else {
                // Stop if there are no more ingredients
                break;
            }
        }
        const newInnerHtml = `
           <div class="ingredientDiv">
                <img src="${element.strMealThumb}">
                <h1>${element.strMeal}</h2>
                    <h5>Ingredients:</h5>
                <ul>
                   ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
                </ul>
           </div>
      `
        // Get all ingredients from the object. Up to 20
        mealDetails.innerHTML = newInnerHtml;
       }





    
const searchBar = document.getElementById('searchBox')
  const db2 = searchBar.addEventListener('keyup', function(e){
   // document.getElementById('searchBox').target.value = ""
    
        const searchString = e.target.value;
           mealName(searchString)
        
     
    })
    
 

