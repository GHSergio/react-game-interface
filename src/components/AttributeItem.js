function AttributeItem({ name, total, base, equipped }) {
  return (
    <li>
      <span>
        {name}: {total} ({base}+{equipped})
      </span>
    </li>
  );
}

export default AttributeItem;
