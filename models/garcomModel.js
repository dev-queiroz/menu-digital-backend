const supabase = require("../config/db");
const bcrypt = require('bcrypt');

const criarGarcom = async (nome, email, senha, cargo = 'garcom') => {
  // Hash da senha
  const senha_hash = await bcrypt.hash(senha, 10);

  const { data, error } = await supabase
    .from('garcons')
    .insert({
      nome,
      email,
      senha_hash,
      cargo,
      ativo: true
    });

  if (error) throw error;
  return data[0];
};

const alterarSenhaGarcom = async (id, novaSenha) => {
  const senha_hash = await bcrypt.hash(novaSenha, 10);

  const { data, error } = await supabase
    .from('garcons')
    .update({ senha_hash })
    .match({ id });

  if (error) throw error;
  return data[0];
};

const buscarGarcomPorEmail = async (email) => {
  const { data, error } = await supabase
    .from('garcons')
    .select('*')
    .eq('email', email)
    .eq('ativo', true)
    .single();

  if (error) throw error;
  return data;
};

const listarGarcons = async () => {
  const { data, error } = await supabase
    .from('garcons')
    .select('id, nome, email, cargo, ativo, created_at')
    .order('nome');

  if (error) throw error;
  return data;
};

const desativarGarcom = async (id) => {
  const { data, error } = await supabase
    .from('garcons')
    .update({ ativo: false })
    .match({ id });

  if (error) throw error;
  return data[0];
};

module.exports = { 
  criarGarcom, 
  alterarSenhaGarcom,
  buscarGarcomPorEmail,
  listarGarcons,
  desativarGarcom
}; 