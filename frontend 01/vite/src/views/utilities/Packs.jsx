import { useState, useEffect } from "react"
import {
  Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, IconButton, Dialog, DialogActions, DialogContent, DialogTitle,
  TextField, CircularProgress, Alert, Checkbox, FormControlLabel,
  Select, MenuItem, FormControl, InputLabel
} from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import AddIcon from "@mui/icons-material/Add"

export default function PacksManagement() {
  const [packs, setPacks] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [openDialog, setOpenDialog] = useState(false)
  const [editingPack, setEditingPack] = useState(null)
  const [formData, setFormData] = useState({
    category_id: "",
    name: "",
    description: "",
    is_published: false,
    plans: [],
  })

  const API_BASE = import.meta.env.VITE_API_BASE_ADMIN

  // Helper: attach Authorization headers
  const getAuthHeaders = () => {
    const token = localStorage.getItem("token")
    return token ? { Authorization: `Bearer ${token}` } : {}
  }

  useEffect(() => {
    fetchPacks()
    fetchCategories()
  }, [])

  // 🟢 Fetch all packs
  const fetchPacks = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${API_BASE}/packs`, {
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders(),
        },
      })
      if (!response.ok) throw new Error("Failed to fetch packs")
      const data = await response.json()
      setPacks(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  // 🟢 Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_BASE}/categories`, {
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders(),
        },
      })
      if (!response.ok) throw new Error("Failed to fetch categories")
      const data = await response.json()
      setCategories(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    }
  }

  // 🟢 Open dialog for add/edit
  const handleOpenDialog = (pack = null) => {
    if (pack) {
      setEditingPack(pack)
      setFormData({
        category_id: pack.category_id,
        name: pack.name,
        description: pack.description,
        is_published: pack.is_published,
        plans: pack.plans || [],
      })
    } else {
      setEditingPack(null)
      setFormData({
        category_id: "",
        name: "",
        description: "",
        is_published: false,
        plans: [],
      })
    }
    setOpenDialog(true)
  }

  // 🟢 Close dialog
  const handleCloseDialog = () => {
    setOpenDialog(false)
    setEditingPack(null)
  }

  // 🟢 Create or update pack
  const handleSubmit = async () => {
    try {
      const url = editingPack
        ? `${API_BASE}/packs/${editingPack.id}`
        : `${API_BASE}/packs`
      const method = editingPack ? "PATCH" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders(),
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error("Failed to save pack")

      await response.json()
      handleCloseDialog()
      fetchPacks()
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    }
  }

  // 🟢 Delete pack
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this pack?")) return
    try {
      const response = await fetch(`${API_BASE}/packs/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders(),
        },
      })
      if (!response.ok) throw new Error("Failed to delete pack")
      fetchPacks()
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    }
  }

  // 🟢 Utility to get category name
  const getCategoryName = (categoryId) => {
    const category = categories.find((c) => c.id === categoryId)
    return category ? category.name : "Unknown"
  }

  // 🟡 Loading indicator
  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box>
      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <h2 className="text-2xl font-semibold text-foreground">Packs Management</h2>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
          sx={{ bgcolor: "primary.main" }}
        >
          Add Pack
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Category</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Description</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Published</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {packs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                  <p className="text-muted-foreground">
                    No packs found. Create your first pack!
                  </p>
                </TableCell>
              </TableRow>
            ) : (
              packs.map((pack) => (
                <TableRow key={pack.id} hover>
                  <TableCell>{pack.name}</TableCell>
                  <TableCell>{getCategoryName(pack.category_id)}</TableCell>
                  <TableCell sx={{ maxWidth: 300, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {pack.description}
                  </TableCell>
                  <TableCell>
                    {pack.is_published ? (
                      <span style={{ color: "#22c55e" }}>Yes</span>
                    ) : (
                      <span style={{ color: "#6b7280" }}>No</span>
                    )}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton size="small" onClick={() => handleOpenDialog(pack)} sx={{ mr: 1 }}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" onClick={() => handleDelete(pack.id)} color="error">
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* 🟢 Add/Edit Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{editingPack ? "Edit Pack" : "Add Pack"}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 2 }}>
            <TextField
              label="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              fullWidth
              required
            />
            <FormControl fullWidth required>
              <InputLabel>Category</InputLabel>
              <Select
                value={formData.category_id}
                label="Category"
                onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
              >
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              fullWidth
              multiline
              rows={3}
              required
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.is_published}
                  onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                />
              }
              label="Published"
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={!formData.name || !formData.category_id || !formData.description}
          >
            {editingPack ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
