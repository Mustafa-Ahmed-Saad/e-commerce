import { useContextMain } from "../../../contexts/MainContext";
import SEO from "../../../helper/SEO";
import CategoryCard from "../../categoryCard/CategoryCard";
import Loading from "../../locading/Loading";
import { useGetCategories } from "../../../helper/hooks/asyncFunction";

export default function Categories() {
  const { loading } = useContextMain();
  const { categories } = useGetCategories("withLoading");

  let ui = <Loading />;

  if (!loading) {
    ui = (
      <>
        <SEO
          title="Categories"
          description="Category of Ecommerce App"
          facebookType="website"
          twitterType="summary"
        />
        <div className="container my-5">
          <div
            className="row g-4 wow fadeInDown"
            data-wow-offset="10"
            data-wow-delay="0.2s"
            data-wow-iteration="1"
          >
            {categories?.map((category, index) => (
              <div
                key={category._id}
                className="col-12 col-md-6 col-lg-4 col-xl-3"
              >
                <CategoryCard category={category} />
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
  return ui;
}
