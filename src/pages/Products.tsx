import React, { useEffect, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Layout, Row, Col, Spin, Alert, Typography } from "antd";
import { fetchProducts } from "../api/productsApi";
import { ProductCard } from "../components/ProductCard";

const { Content } = Layout;
const { Title } = Typography;

const Products: React.FC = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ["products"],
      queryFn: fetchProducts,
      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage.nextPage,
    });

  const observerTarget = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [observerTarget, hasNextPage, fetchNextPage]);

  return (
    <Content className="page-content">
      <Title level={2} className="page-title">
        Daily Deals
      </Title>

      {status === "pending" ? (
        <div className="products-loader">
          <Spin size="large"/>
        </div>
      ) : status === "error" ? (
        <Alert
          message="Error"
          description="Failed to load products. Please try again later."
          type="error"
          showIcon
        />
      ) : (
        <>
          <Row gutter={[24, 24]}>
            {data?.pages.map((group, i) => (
              <React.Fragment key={i}>
                {group.items.map((product) => (
                  <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
                    <ProductCard product={product} />
                  </Col>
                ))}
              </React.Fragment>
            ))}
          </Row>

          <div ref={observerTarget} className="load-more-container">
            {isFetchingNextPage && <Spin size="default" />}
            {!hasNextPage && (
              <Typography.Text type="secondary">
                No more products to load.
              </Typography.Text>
            )}
          </div>
        </>
      )}
    </Content>
  );
};

export default Products;
