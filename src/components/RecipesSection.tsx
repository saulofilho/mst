import React, { useState, useMemo } from 'react';
import { Recipe, RecipeCategory } from '../types';
import { RECIPES_DATA } from '../data/recipes';
import { 
  Clock, 
  Users, 
  Utensils, 
  Sparkles, 
  Check, 
  Bookmark, 
  MapPin, 
  Printer, 
  X, 
  ArrowRight,
  ShieldCheck,
  Wheat
} from 'lucide-react';

interface RecipesSectionProps {
  onLocateMarketForProduct: (productName: string) => void;
}

export const RecipesSection: React.FC<RecipesSectionProps> = ({ onLocateMarketForProduct }) => {
  const [selectedCategory, setSelectedCategory] = useState<RecipeCategory>('todos');
  const [activeRecipe, setActiveRecipe] = useState<Recipe | null>(null);
  const [checkedIngredients, setCheckedIngredients] = useState<Record<string, boolean>>({});
  const [savedRecipeIds, setSavedRecipeIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('mst_favorite_recipes');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const categories: { id: RecipeCategory; label: string }[] = [
    { id: 'todos', label: 'Todas as Receitas' },
    { id: 'prato_principal', label: 'Pratos Principais' },
    { id: 'vegetariano', label: 'Vegetarianos & Veganos' },
    { id: 'sobremesa', label: 'Sobremesas da Roça' },
    { id: 'cafe_lanche', label: 'Café & Lanches' },
  ];

  const filteredRecipes = useMemo(() => {
    if (selectedCategory === 'todos') return RECIPES_DATA;
    return RECIPES_DATA.filter((r) => r.category === selectedCategory);
  }, [selectedCategory]);

  const toggleFavoriteRecipe = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSavedRecipeIds((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem('mst_favorite_recipes', JSON.stringify(next));
      } catch (err) {
        console.error('Failed to save favorite recipes', err);
      }
      return next;
    });
  };

  const handleToggleIngredient = (ingredient: string) => {
    setCheckedIngredients((prev) => ({
      ...prev,
      [ingredient]: !prev[ingredient],
    }));
  };

  const handlePrintRecipe = () => {
    window.print();
  };

  return (
    <section id="receitas-organicas" className="py-16 bg-[#FAF8F5] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-red-700 tracking-wider uppercase mb-2">
              <Wheat className="w-4 h-4" />
              <span>Culinária da Terra & Agroecologia</span>
              <span aria-hidden="true">·</span>
              <span>Comida de Verdade</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight text-balance">
              Receitas Orgânicas com Produtos das Feiras
            </h2>
            <p className="mt-3 text-base text-stone-600 leading-relaxed">
              Descubra preparos nutritivos e tradicionais que valorizam o arroz orgânico Terra Livre, 
              o feijão crioulo sem agrotóxicos, raízes da agricultura camponesa e a biodiversidade brasileira.
            </p>
          </div>

          {/* Saved count badge if any */}
          {savedRecipeIds.length > 0 && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-stone-200 text-xs font-medium text-stone-700 self-start md:self-auto">
              <Bookmark className="w-3.5 h-3.5 fill-red-700 text-red-700" />
              <span>{savedRecipeIds.length} receita{savedRecipeIds.length > 1 ? 's' : ''} salva{savedRecipeIds.length > 1 ? 's' : ''}</span>
            </div>
          )}
        </div>

        {/* Categories Bar */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-red-700 text-white shadow-xs'
                    : 'bg-white text-stone-600 border border-stone-200 hover:text-stone-900 hover:bg-stone-50'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Recipes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRecipes.map((recipe) => {
            const isFav = savedRecipeIds.includes(recipe.id);
            return (
              <div
                key={recipe.id}
                onClick={() => setActiveRecipe(recipe)}
                className="group bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md hover:border-stone-300 transition-all cursor-pointer flex flex-col"
              >
                {/* Recipe Image with Scrim */}
                <div className="relative aspect-4/3 overflow-hidden bg-stone-100">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  
                  {/* Top tags */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-white bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-md">
                      {recipe.categoryLabel}
                    </span>
                    <button
                      onClick={(e) => toggleFavoriteRecipe(recipe.id, e)}
                      title="Favoritar receita"
                      className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center hover:bg-white text-stone-700 transition-colors shadow-xs"
                    >
                      <Bookmark
                        className={`w-4 h-4 ${
                          isFav ? 'fill-red-700 text-red-700' : 'text-stone-600'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Bottom meta */}
                  <div className="absolute bottom-3 left-3 right-3 text-white text-xs flex items-center gap-3 font-medium">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-red-300" />
                      <span>{recipe.prepTimeMinutes + recipe.cookTimeMinutes} min</span>
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-red-300" />
                      <span>{recipe.servings} porções</span>
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{recipe.difficulty}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-xl font-serif font-bold text-stone-900 group-hover:text-red-700 transition-colors line-clamp-1">
                      {recipe.title}
                    </h3>
                    <p className="text-xs text-stone-500 mt-1 line-clamp-2">
                      {recipe.subtitle}
                    </p>
                  </div>

                  {/* MST Ingredient highlight */}
                  <div className="pt-3 border-t border-stone-100 space-y-1.5">
                    <div className="text-[11px] font-semibold text-emerald-800 uppercase tracking-wider flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Ingredientes da Reforma Agrária:</span>
                    </div>
                    <div className="text-xs text-stone-700 font-medium">
                      {recipe.mstIngredients.map((ing) => ing.name).join(' · ')}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 text-xs font-semibold text-red-700 group-hover:translate-x-0.5 transition-transform">
                    <span>Ver modo de preparo</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal: Recipe Details & Steps */}
        {activeRecipe && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
            <div className="relative bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-stone-200">
              {/* Modal Header */}
              <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-stone-200 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-red-700 uppercase tracking-wider">
                    {activeRecipe.categoryLabel}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
                    {activeRecipe.title}
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleFavoriteRecipe(activeRecipe.id)}
                    className="p-2 text-stone-500 hover:text-red-700 hover:bg-stone-100 rounded-lg transition-colors"
                    title="Favoritar receita"
                  >
                    <Bookmark
                      className={`w-5 h-5 ${
                        savedRecipeIds.includes(activeRecipe.id)
                          ? 'fill-red-700 text-red-700'
                          : 'text-stone-500'
                      }`}
                    />
                  </button>
                  <button
                    onClick={handlePrintRecipe}
                    className="p-2 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors hidden sm:block"
                    title="Imprimir receita"
                  >
                    <Printer className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setActiveRecipe(null)}
                    className="p-2 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 sm:p-8 space-y-8">
                {/* Visual Banner */}
                <div className="relative aspect-16/9 rounded-2xl overflow-hidden shadow-xs">
                  <img
                    src={activeRecipe.image}
                    alt={activeRecipe.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white text-xs flex flex-wrap items-center gap-4">
                    <span className="bg-black/60 px-3 py-1 rounded-md">
                      Preparo: {activeRecipe.prepTimeMinutes} min
                    </span>
                    <span className="bg-black/60 px-3 py-1 rounded-md">
                      Cozimento: {activeRecipe.cookTimeMinutes} min
                    </span>
                    <span className="bg-black/60 px-3 py-1 rounded-md">
                      Rendimento: {activeRecipe.servings} porções
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-sans">
                  {activeRecipe.description}
                </p>

                {/* Agroecological spotlight box */}
                <div className="bg-[#FAF8F5] rounded-2xl border border-stone-300 p-5 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800">
                    <ShieldCheck className="w-4 h-4 text-emerald-700" />
                    <span>Cadeia Produtiva Solidária & Cooperativas de Origem</span>
                  </div>
                  <div className="space-y-3 divide-y divide-stone-200">
                    {activeRecipe.mstIngredients.map((item, i) => (
                      <div key={i} className={i > 0 ? 'pt-3' : ''}>
                        <div className="text-sm font-semibold text-stone-900">{item.name}</div>
                        <div className="text-xs text-red-700 font-medium">{item.cooperativeOrigin}</div>
                        <div className="text-xs text-stone-600 mt-0.5">{item.benefit}</div>
                      </div>
                    ))}
                  </div>
                  <div className="pt-2">
                    <button
                      onClick={() => {
                        const firstProduct = activeRecipe.mstIngredients[0]?.name || '';
                        onLocateMarketForProduct(firstProduct);
                        setActiveRecipe(null);
                      }}
                      className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-xs transition-colors"
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      <span>Onde encontrar esses ingredientes na feira mais próxima</span>
                    </button>
                  </div>
                </div>

                {/* Ingredients with checklist */}
                <div>
                  <h4 className="text-lg font-serif font-bold text-stone-900 mb-3 flex items-center justify-between">
                    <span>Lista de Ingredientes</span>
                    <span className="text-xs font-normal text-stone-500">
                      Clique para marcar o que você já tem na despensa
                    </span>
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700">
                    {activeRecipe.ingredients.map((ing, i) => {
                      const isChecked = !!checkedIngredients[ing];
                      return (
                        <li
                          key={i}
                          onClick={() => handleToggleIngredient(ing)}
                          className={`p-2.5 rounded-lg border flex items-start gap-2.5 cursor-pointer transition-colors ${
                            isChecked
                              ? 'bg-stone-50 border-stone-200 text-stone-400 line-through'
                              : 'bg-white border-stone-200 hover:bg-stone-50 text-stone-800'
                          }`}
                        >
                          <div
                            className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 mt-0.5 ${
                              isChecked
                                ? 'bg-red-700 border-red-700 text-white'
                                : 'border-stone-300 bg-white'
                            }`}
                          >
                            {isChecked && <Check className="w-3 h-3" />}
                          </div>
                          <span>{ing}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Instructions Steps */}
                <div>
                  <h4 className="text-lg font-serif font-bold text-stone-900 mb-4">
                    Modo de Preparo Passo a Passo
                  </h4>
                  <ol className="space-y-4">
                    {activeRecipe.instructions.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-4 text-xs sm:text-sm text-stone-700 leading-relaxed">
                        <span className="w-6 h-6 rounded-full bg-stone-900 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <div className="flex-1">{step}</div>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Agro Tip */}
                <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950 flex items-start gap-3">
                  <Sparkles className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Dica Agroecológica de Cozinha:</span>{' '}
                    <span>{activeRecipe.agroTip}</span>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
                <button
                  onClick={() => setActiveRecipe(null)}
                  className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900 transition-colors"
                >
                  Fechar
                </button>
                <button
                  onClick={() => {
                    const firstProduct = activeRecipe.mstIngredients[0]?.name || '';
                    onLocateMarketForProduct(firstProduct);
                    setActiveRecipe(null);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-red-700 hover:bg-red-800 rounded-lg shadow-xs transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Localizar Ingredientes no Mapa</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
