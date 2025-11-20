import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllInventoryItems } from '../features/inventorySlice';
import { addNewMenuItem, updateExistingMenuItem } from '../features/menuSlice';

const CATEGORIES = ["Hot Beverages" , "Cold Beverages" ,"Pastries","Sandwiches"];

const MenuItemForm = ({ currentItem, onClose }) => {
  const dispatch = useDispatch();
  const inventoryItems = useSelector(selectAllInventoryItems);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    category: CATEGORIES[0],
    isAvailable: true,
    imageUrl: '',
    recipe: [], 
  });

  useEffect(() => {
    if (currentItem) {
      setFormData({
        name: currentItem.name,
        description: currentItem.description,
        price: currentItem.price,
        category: currentItem.category,
        isAvailable: currentItem.isAvailable,
        imageUrl: currentItem.imageUrl || '',
        recipe: currentItem.recipeComponents.map(rc => ({
          inventoryItemId: rc.inventoryItemId,
          quantityConsumed: rc.quantityConsumed,
        })),
      });
    } else {
      setFormData({
        name: '', description: '', price: 0,
         category: CATEGORIES[0], 
        isAvailable: true, imageUrl: '', recipe: []
      });
    }
  }, [currentItem]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleRecipeChange = (index, e) => {
    const { name, value } = e.target;
    const newRecipe = [...formData.recipe];
    newRecipe[index][name] = value;
    setFormData((prev) => ({ ...prev, recipe: newRecipe }));
  };

  const addRecipeComponent = () => {
    setFormData((prev) => ({
      ...prev,
      recipe: [...prev.recipe, { inventoryItemId: '', quantityConsumed: 0 }],
    }));
  };

  const removeRecipeComponent = (index) => {
    const newRecipe = formData.recipe.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, recipe: newRecipe }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const menuItemData = { ...formData }; 
    
    if (currentItem) {
      dispatch(updateExistingMenuItem({ menuId: currentItem.id, menuItemData }));
    } else {
      dispatch(addNewMenuItem(menuItemData));
    }
    onClose(); 
  };

  return (
    <form className="menu-item-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <div className="form-group">
          <label>Name</label>
          <input name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Category</label>
          {/* <input name="category" value={formData.category} onChange={handleChange} required /> */}
          <select name="category" value={formData.category} onChange={handleChange}>
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Price</label>
          <input name="price" type="number" step="0.01" value={formData.price} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Image URL</label>
          <input name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="https://..."/>
        </div>
        <div className="form-group full-width">
          <label>Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>
            <input name="isAvailable" type="checkbox" checked={formData.isAvailable} onChange={handleChange} />
            Available
          </label>
        </div>
      </div>

      <h4>Recipe</h4>
      {formData.recipe.map((component, index) => (
        <div key={index} className="recipe-component">
          <select 
            name="inventoryItemId"
            value={component.inventoryItemId}
            onChange={(e) => handleRecipeChange(index, e)}
            required
          >
            <option value="">Select Inventory Item</option>
            {inventoryItems.map(item => (
              <option key={item.id} value={item.id}>
                {item.name} ({item.unitOfMeasure})
              </option>
            ))}
          </select>
          <input
            name="quantityConsumed"
            type="number"
            step="0.1"
            placeholder="Quantity"
            value={component.quantityConsumed}
            onChange={(e) => handleRecipeChange(index, e)}
            required
          />
          <button type="button" onClick={() => removeRecipeComponent(index)}>&times;</button>
        </div>
      ))}
      <button type="button" className="btn-add-recipe" onClick={addRecipeComponent}>
        + Add Ingredient
      </button>

      <div className="form-actions">
        <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
        <button type="submit" className="btn-save">Save</button>
      </div>
    </form>
  );
};

export default MenuItemForm;