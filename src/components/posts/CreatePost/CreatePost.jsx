import React, { useContext, useState } from 'react';
import './CreatePost.css';
import { UserContext } from '../../../context/UserContext';
import { AppContext } from '../../../context/AppContext';
import { useNavigate } from 'react-router-dom';

export default function CreatePost() {
  const { user, getAuthToken } = useContext(UserContext);

  const { posts, setPosts} = useContext(AppContext)

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    ingredients: [''], 
    instructions: [''],
    category: '',
    bakingTime: '',
    calories: '',
    difficulty: '',
    recipeTags: [''],
    imageUrl: '',
  });

  const handleDifficulty = (value) => {
    setFormData((prevState) => ({
      ...prevState,
      difficulty: value,
    }));
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleAddTag = () => {
    setFormData(prevState => ({
      ...prevState,
      recipeTags: [...prevState.recipeTags, ''] // Add an empty string when adding a new tag
    }));
  };

  const handleRemoveLatestTag = () => {
    setFormData(prevState => {
      const updatedTags = [...prevState.recipeTags];
      updatedTags.pop(); // Remove the last tag
      return {
        ...prevState,
        recipeTags: updatedTags
      };
    });
  };

  const handleTagChange = (index, value) => {
    const updatedTags = [...formData.recipeTags];
    updatedTags[index] = value;
    setFormData(prevState => ({
      ...prevState,
      recipeTags: updatedTags
    }));
  };
  
  const handleInstructionChange = (index, value) => {
    const updatedInstructions = [...formData.instructions];
    updatedInstructions[index] = value;
    setFormData(prevState => ({
      ...prevState,
      instructions: updatedInstructions
    }));
  };

  const handleAddInstruction = () => {
    setFormData(prevState => ({
      ...prevState,
      instructions: [...prevState.instructions, ''] // Add an empty string when adding a new ingredient
    }));
  };

  const handleRemoveLatestInstruction = () => {
    setFormData(prevState => {
      const updatedInstructions = [...prevState.instructions];
      updatedInstructions.pop(); // Remove the last ingredient
      return {
        ...prevState,
        instructions: updatedInstructions
      };
    });
  }

  const handleIngredientChange = (index, value) => {
    const updatedIngredients = [...formData.ingredients];
    updatedIngredients[index] = value;
    setFormData(prevState => ({
      ...prevState,
      ingredients: updatedIngredients
    }));
  };

  const handleAddIngredient = () => {
    setFormData(prevState => ({
      ...prevState,
      ingredients: [...prevState.ingredients, ''] // Add an empty string when adding a new ingredient
    }));
  };

  const handleRemoveLatestIngredient = () => {
    setFormData(prevState => {
      const updatedIngredients = [...prevState.ingredients];
      updatedIngredients.pop(); // Remove the last ingredient
      return {
        ...prevState,
        ingredients: updatedIngredients
      };
    });
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission'

    if(formData.title === '' || formData.description === '' || formData.ingredients.length === 0 || formData.instructions.length === 0 || formData.category === '' || formData.bakingTime === '' || formData.calories === '' || formData.difficulty === '' || formData.recipeTags.length === 0) {
      return alert('Please fill in all fields');
    }

    // check if all ingredients are filled
    for (let ingredient of formData.ingredients) {
      if(ingredient === '') {
        return alert('Please fill in all ingredients or remove u');
      }
    }

    // check if all instructions are filled
    for (let instruction of formData.instructions) {
      if(instruction === '') {
        return alert('Please fill in all instructions or remove unused instructions');
      }
    }

    // check if all tags are filled
    for (let tag of formData.recipeTags) {
      if(tag === '') {
        return alert('Please fill in all tags or remove unused tags');
      }
    }
    console.log("JSON DATA:" , JSON.stringify(formData));
  

    try {
      console.log('AUTH TOKEN:', getAuthToken())
      fetch('http://localhost:4000/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getAuthToken()}`,
      },
      body: JSON.stringify(formData),
    })
    
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      setPosts([formData, ...posts]);
      navigate(`/posts/${data.data.id}`)
    })      
    } catch (error) {
      console.error('Error:', error);
      alert('Error creating post');
    }

  };

  return (
    <div className='createPostContainer'>
      <div className='postForm'>
      <h1>Create a new post</h1>

        <form>
          <div>
            <label htmlFor='title'>Title</label>
            <input type='text' id='title' name='title' value={formData.title} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor='description'>Description</label>
            <textarea id='description' name='description' value={formData.description} onChange={handleChange} className='description' />
          </div>
          <div>
            <label htmlFor='imageUrl'>Image URL</label>
            <input type='text' id='imageUrl' name='imageUrl' value={formData.imageUrl} onChange={handleChange} />
          </div>

          <div className='IngredientsContainer'>
            <label htmlFor='ingredients'>Ingredients</label>
            <div className='ingredients'>
              {formData.ingredients.map((ingredient, index) => (
                <div key={index} className='ingredient'>
                  <input type='text' value={ingredient} onChange={(e) => handleIngredientChange(index, e.target.value)}
                  placeholder={`Ingredient ${index + 1}`}/>
                </div>
              ))} 
            </div>
          
            <div>
              <button type='button' onClick={handleAddIngredient}
              className='buttonIngredients'
              >Add Ingredient
              </button>
              <button type='button' onClick={handleRemoveLatestIngredient}
              className='buttonIngredients'>Remove last</button>
            </div>
          </div>

          <div className='InstructionsContainer'>
            <label htmlFor='instructions'>Instructions</label>
            <div className='instructions'>
              {formData.instructions.map((instruction, index) => (
                <div key={index} className='instruction'>
                  <textarea type='text' placeholder={`Step ${index + 1}`} value={instruction} onChange={(e) => handleInstructionChange(index, e.target.value)} className='description'/>
                </div>
              ))} 
            </div>
          
            <div>
              <button type='button' onClick={handleAddInstruction}
              className='buttonIngredients'
              >Add Instruction
              </button>
              <button type='button' onClick={handleRemoveLatestInstruction}
              className='buttonIngredients'>Remove last</button>
            </div>
          </div>


          <div className='OtherContainer' >
            <div className='OtherItem'>
              <label htmlFor='category'>Category</label>
              <input id='category' name='category' value={formData.category} onChange={handleChange} className='category' />
            </div>
            <div className='OtherItem'>
              <label htmlFor='bakingTime'>Baking Time (minutes)</label>
              <input id='bakingTime' name='bakingTime' value={formData.bakingTime} onChange={handleChange} className='bakingTime' />
            </div>
            <div className='OtherItem'>
              <label htmlFor='calories'>Calories</label>
              <input id='calories' name='calories' value={formData.calories} onChange={handleChange} className='calories' />
            </div>
            <div className='difficulty'>
            <label htmlFor='difficulty'>Difficulty</label>
              <div className='difficultyButtons'>
              <button type='button' onClick={() => handleDifficulty('Easy')} className={formData.difficulty === 'Easy' ? 'selected' : ''}>
                  Easy
                </button>
                <button type='button' onClick={() => handleDifficulty('Medium')} className={formData.difficulty === 'Medium' ? 'selected' : ''}>
                  Medium
                </button>
                <button type='button' onClick={() => handleDifficulty('Hard')} className={formData.difficulty === 'Hard' ? 'selected' : ''}>
                  Hard
                </button>
              </div>
            </div>
          </div>
          <div className='TagsContainer'>
            <label htmlFor='tags'>Tags</label>
            <div className='tags'>
              {formData.recipeTags.map((tag, index) => (
                <div key={index} className='tag'>
                  <textarea type='text' placeholder={`Tag ${index + 1}`} value={tag} onChange={(e) => handleTagChange(index, e.target.value)}/>
                </div>
              ))} 
            </div>
          
            <div>
              <button type='button' onClick={handleAddTag}
              className='buttonIngredients'
              >Add Tag
              </button>
              <button type='button' onClick={handleRemoveLatestTag}
              className='buttonIngredients'>Remove last</button>
            </div>
          </div>

          <div className='submitButton' onClick={handleSubmit} >Create post</div>
        </form>
      </div>
    </div>
  );
}
