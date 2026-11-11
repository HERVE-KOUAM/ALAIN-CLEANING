const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
  // Exclure les dossiers de travail du build (ne pas copier dans _site)
  eleventyConfig.ignores.add("legacy/**");
  eleventyConfig.ignores.add("plans/**");
  eleventyConfig.ignores.add("dist/**");
  eleventyConfig.ignores.add("_site/**");

  // ---- Pass-through : fichiers statiques copiés tels quels, sans modification ----
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("js");
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("fonts");
  eleventyConfig.addPassthroughCopy({ "style.css": "style.css" });
  eleventyConfig.addPassthroughCopy({ "index.html": "index.html" });

  // Rend les dates lisibles en français
  eleventyConfig.addFilter("dateFr", function (dateObj) {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).setLocale("fr").toFormat("d LLLL yyyy");
  });

  // Collection ordonnée des articles de blog
  eleventyConfig.addCollection("posts", function (collectionApi) {
    return collectionApi.getFilteredByGlob("_posts/*.md").reverse();
  });

  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    passthroughFileCopy: true,
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["md", "njk", "html", "11ty.js"]
  };
};