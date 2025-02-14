## Useful information
- Run the dev server: npm run dev
- Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
- [Next.js Documentation](https://nextjs.org/docs)
- Deploy to [Vercel Platform](https://vercel.com) from the creators of Next.js.

## Libraries used 
- Supabase : Postgres database and Authentication
- React query : client side caching and NextJS handle server side caching
- Motion : for animation
- Replace axios with react query


each folder has
    unique id
    name
    parent ID (null for root folder)


    <!-- const [location, setLocation] = useState({});

    const fetchLocationDetails = async (latitude: number, longitude: number) => {
        try {
            const response = await fetch(`https://ipapi.co/json`);
            const data = await response.json();
            setLocation({
                ip: data.ip,
                network: data.network,
                version: data.version,
                city: data.city,
                region: data.region,
                country_namee: data.country_namee,
                latitude: data.latitude,
                longitude: data.longitude,
                timezone: data.timezone,
                country_calling_code: data.country_calling_code,
                currency_name: data.currency_name,
                org: data.org
            });
        } catch (error) {
            console.error("Error fetching location details:", error);
        }
    };

    const getUserLocation = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    fetchLocationDetails(latitude, longitude);
                },
                (error) => {
                    console.error("Geolocation error:", error.message);
                    setLocation({ ip: "N/A", country: "N/A", timezone: "N/A" });
                }
            );
        } else {
            console.log("Geolocation is not supported.");
        }
    };

    useEffect(() => {
        getUserLocation();
    }, []);
    
    <div className="p-4 shadow-lg">
            <p><strong>IP Address:</strong> {JSON.stringify(location)}</p>
            <button onClick={getUserLocation} className="mt-2">Refresh</button>
    </div> -->



<!-- Soft Delete (Move to Trash) -->
export const softDeleteItem = async (id: string) => {
  const { error } = await supabase
    .from('items')
    .update({ status_flag: 'inactive' })
    .eq('id', id);

  if (error) {
    console.error("Error deleting item:", error.message);
  }
};

<!-- Fetch Deleted Items (Trash) -->
export const fetchDeletedItems = async () => {
  const { data, error } = await supabase
    .from('items')
    .select('*')
    .eq('status_flag', 'inactive');

  if (error) {
    console.error("Error fetching deleted items:", error.message);
  }

  return data || [];
};

<!-- Restore Item from Trash -->
export const restoreItem = async (id: string) => {
  const { error } = await supabase
    .from('items')
    .update({ status_flag: 'active' })
    .eq('id', id);

  if (error) {
    console.error("Error restoring item:", error.message);
  }
};
