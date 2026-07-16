-- Atomic inventory decrement for order placement (race-safe).
CREATE OR REPLACE FUNCTION public.decrement_product_inventory(
  p_product_id uuid,
  p_quantity integer
)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_inventory integer;
BEGIN
  IF p_quantity IS NULL OR p_quantity <= 0 THEN
    RAISE EXCEPTION 'INVALID_QUANTITY';
  END IF;

  UPDATE products
  SET
    inventory = inventory - p_quantity,
    updated_at = NOW()
  WHERE id = p_product_id
    AND inventory >= p_quantity
  RETURNING inventory INTO new_inventory;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'INSUFFICIENT_STOCK';
  END IF;

  RETURN new_inventory;
END;
$$;

GRANT EXECUTE ON FUNCTION public.decrement_product_inventory(uuid, integer) TO service_role;
GRANT EXECUTE ON FUNCTION public.decrement_product_inventory(uuid, integer) TO authenticated;
GRANT EXECUTE ON FUNCTION public.decrement_product_inventory(uuid, integer) TO anon;
