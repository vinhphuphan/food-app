-- 1. Tìm 5 người đã like nhà hàng nhiều nhất:

SELECT u.user_id, u.full_name, COUNT(l.user_id) AS like_count
FROM users u 
INNER JOIN like_res l
ON u.user_id = l.user_id
GROUP BY u.user_id
ORDER BY like_count DESC
LIMIT 5;

-- 2. Tìm 2 nhà hàng có lượt like nhiều nhất:

SELECT r.res_id, r.res_name, COUNT(l.res_id) AS like_count
FROM restaurants r 
INNER JOIN like_res l
ON r.res_id = l.res_id
GROUP BY r.res_id
ORDER BY like_count DESC
LIMIT 2;

-- 3.Tìm người đã đặt hàng nhiều nhất:

SELECT u.user_id, u.full_name, COUNT(o.user_id) AS order_count
FROM users u 
INNER JOIN orders o
ON u.user_id = o.user_id
GROUP BY u.user_id
ORDER BY order_count DESC
LIMIT 1;

-- 4. Tìm người dùng không hoạt động trong hệ thống
-- (không đặt hàng, không like, không đánh giá nhà hàng)

SELECT u.user_id, u.full_name
FROM users u
LEFT JOIN orders o
ON u.user_id = o.user_id
LEFT JOIN like_res l 
ON u.user_id = l.user_id
LEFT JOIN rate_res r 
ON u.user_id = o.user_id
WHERE o.user_id IS NULL AND l.user_id IS NULL AND r.user_id IS NULL;