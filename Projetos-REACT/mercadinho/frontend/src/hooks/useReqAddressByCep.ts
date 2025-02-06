export const useReqAddressByCep = async (cep: string | undefined) => {
  const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`).then(
    (res) => res
  );

  const address = await res.json();
  const error = address.erro === "true" ? true : false;
  return { address, error };
};
